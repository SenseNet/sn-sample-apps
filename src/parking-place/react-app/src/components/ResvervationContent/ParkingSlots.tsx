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
  currentUserId: number | undefined;
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
  ownReservation: boolean;
};

function ParkingSlots({ selectedDate, selectedSlot, setSelectedSlot, setSelectedAction, currentUserId}: ParkingSlotsProps) {
  const repository = useRepository();

  const [data, setData] = useState<Array<SlotData>>([]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate, setSelectedSlot]);

  useEffect(() => {
    const ac = new AbortController();
    const parkingSLots = async () => {
      const slots = await repository.loadCollection<SlotsCollectionT>({
        path: "/Root/Content/sample/parkingplace/parkingplaces",
        requestInit: {
          signal: ac.signal,
        },

        oDataOptions: {
          select: ["DisplayName", "ParkingPlaceCode"],
          enableautofilters: true,
        },
      });

      const reservations = await repository.loadCollection<ReservationsCollectionT>({
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
          ownReservation: reservation?.ParkingPlaceUser?.Id === currentUserId,
        };
      });

      setData(updatedSlots);
    };

    parkingSLots();
  }, [repository, selectedSlot, selectedDate, currentUserId]);

  const styles = UseStyles(ParkingSlotsStyles);
  return (
    <Box sx={styles.root}>
      {data?.map((slot) => {
        return (
          <div key={slot.Id} className="slot">
            {slot.reserved ? (
              <ReservedCard id={slot.reservationId} ownReservation={slot.ownReservation} reservedByName={slot.reservedByName} displayName={slot.DisplayName} parkingPlaceCode={slot.ParkingPlaceCode} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setSelectedAction={setSelectedAction}/>
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
