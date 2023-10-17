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
  selectedSlot: number;
  setSelectedAction: (slot: any) => void;
  setSelectedSlot: (slot: any) => void;
};

type ReservationsCollectionT = {
  Id: number;
  Path: string;
  Name: string;
  Type: string;
  ParkingPlace: any;
  ParkingPlaceUser: any;
  ParkingPlaceBookingStart: string;
  ParkingPlaceBookingEnd: string;  
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
  reservationId?: number;
  reservedBy?: number;
  reservedByName?: string;
};

function ParkingSlots({ selectedDate, selectedSlot, setSelectedSlot, setSelectedAction}: ParkingSlotsProps) {
  const repo = useRepository();
  
  const [data, setData] = useState<Array<SlotData>>([]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate, setSelectedSlot]);

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
          select: ["ParkingPlace", "ParkingPlaceBookingStart", "ParkingPlaceUser"],
          expand: ["ParkingPlace", "ParkingPlaceUser"],
          query: `ParkingPlaceBookingStart:['${selectedDate.format(
            "YYYY-MM-DD 00:00:00"
          )}' TO '${selectedDate
            .add(1, "day")
            .format("YYYY-MM-DD 00:00:00")}'}`,
          enableautofilters: true,
        },
      });

      /*filter restion.d.result with StartDate equal selected date*/

      //  const filteredReservations = reservations.d.results.filter(
      //   (reservation) => {
      //     console.log({
      //       reservation: reservation.StartDate,
      //       selectedDate: selectedDate.format("YYYY-MM-DD"),
      //     });

      //     return (
      //       dayjs(reservation.StartDate).format("YYYY-MM-DD") ===
      //       selectedDate.format("YYYY-MM-DD")
      //     );
      //   }
      // );

      // set reserved slots
      const updatedSlots = slots.d.results.map((slot) => {
        const reservation = reservations.d.results.find(
          (r) => r.ParkingPlace.ParkingPlaceCode === slot.ParkingPlaceCode
        );
        return {
          ...slot,
          reserved: !!reservation,
          reservationId: reservation?.Id,
          reservedBy: reservation?.ParkingPlaceUser,
          reservedByName: reservation?.ParkingPlaceUser?.DisplayName,
        };
      });

      setData(updatedSlots);
    };

    parkingSLots();
  }, [repo, selectedSlot, selectedDate]);

  const styles = UseStyles(ParkingSlotsStyles);
  return (
    <Box sx={styles.root}>
      {data?.map((slot) => {
        return (
          <div key={slot.Id} className="slot">
            {slot.reserved ? (
              <ReservedCard id={slot.reservationId} reservedByName={slot.reservedByName} displayName={slot.DisplayName} parkingPlaceCode={slot.ParkingPlaceCode} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setSelectedAction={setSelectedAction}/>
            ) : (
              <EmptySlot id={slot.Id} displayName={slot.DisplayName} parkingPlaceCode={slot.ParkingPlaceCode} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setSelectedAction={setSelectedAction} />
            )}
          </div>
        );
      })}
    </Box>
  );
}

export default ParkingSlots;
