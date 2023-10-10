import React, { useEffect, useState } from "react";
import { useRepository } from "@sensenet/hooks-react";
import { Box } from "@mui/material";
import { UseStyles } from "../../hooks/useStyles";
import { ParkingSlotsStyles } from "./stlyes";
import EmptySlot from "./EmptySlot";
import ReservedCard from "./ReservedCard";
import { useQuery } from "@tanstack/react-query";
import fetchSlots from "../../fetches/fetchSlots";
import dayjs from "dayjs";
import { type } from "os";
import { setDate } from "date-fns";

type ParkingSlotsProps = {
  selectedDate: dayjs.Dayjs;
};

type ReservationsCollectionT = {
  Id: number;
  Path: string;
  Name: string;
  Type: string;
  ParkingPlace: string;
  User: string;
  StartDate: string;
  EndDate: string;
};

type SlotsCollectionT = {
  Id: number;
  Path: string;
  Name: string;
  Type: string;
  DisplayName: string;
  ParkingPlaceCode: string;
};

type SlotData = SlotsCollectionT & {
  reserved?: boolean;
};

function ParkingSlots({ selectedDate }: ParkingSlotsProps) {
  const repo = useRepository();

  const [data, setData] = useState<Array<SlotData>>([]);

  useEffect(() => {
    const ac = new AbortController();

    const parkingSLots = async () => {
      /*Fetch parking Slots*/

      const slots = await repo.loadCollection<SlotsCollectionT>({
        path: "/Root/Content/sample/parkingplace/parkingplaces",
        requestInit: {
          signal: ac.signal,
        },

        oDataOptions: {
          select: ["DisplayName", "ParkingPlaceCode"],
          enableautofilters: true,
        },
      });

      const reservations = await repo.loadCollection<ReservationsCollectionT>({
        path: "/Root/Content/sample/parkingplace/bookings",
        requestInit: {
          signal: ac.signal,
        },

        oDataOptions: {
          select: ["ParkingPlace", "StartDate", "EndDate", "User"],
          expand: ["ParkingPlace"],
          query: `StartDate:>'${selectedDate.format(
            "YYYY-MM-DD 00:00:00"
          )}' AND StartDate:<'${selectedDate
            .add(1, "day")
            .format("YYYY-MM-DD 00:00:00")}'`,
          enableautofilters: true,
        },
      });

      /*filter restion.d.result with StartDate equal selected date*/

      const filteredReservations = reservations.d.results.filter(
        (reservation) => {
          console.log({
            reservation: reservation.StartDate,
            selectedDate: selectedDate.format("YYYY-MM-DD"),
          });

          return (
            dayjs(reservation.StartDate).format("YYYY-MM-DD") ===
            selectedDate.format("YYYY-MM-DD")
          );
        }
      );

      setData(slots.d.results);
    };

    parkingSLots();
  }, [repo, selectedDate]);

  const styles = UseStyles(ParkingSlotsStyles);

  return (
    <Box sx={styles.root}>
      {data?.map((slot) => {
        return (
          <div key={slot.Id} className="slot">
            {slot.reserved ? (
              <ReservedCard />
            ) : (
              <EmptySlot id={slot.Id} displayName={slot.DisplayName} />
            )}
          </div>
        );
      })}
    </Box>
  );
}

export default ParkingSlots;
