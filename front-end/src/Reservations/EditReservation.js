import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editReservation, readReservation } from "../utils/api";

import ReservationForm from "./ReservationForm";
import { formatAsDate } from "../utils/date-time";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController).then(
      setCurrentReservation
    );
    return () => abortController.abort();
  }, [reservation_id]);

  // Cancel button to return to current deckId
  const onCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  // Submit button to update current card
  async function handleSubmit(reservation) {
    const formattedDate = formatAsDate(reservation.reservation_date);
    await editReservation({
      ...reservation,
    });
    history.push(`/dashboard?date=${formattedDate}`);
  }

  return (
    <div>
      <h2>Edit Card</h2>
      <ReservationForm
        handleSubmit={handleSubmit}
        onCancel={onCancel}
        submitLabel="Submit"
        cancelLabel="Cancel"
        initialState={currentReservation}
      />
    </div>
  );
}

export default EditReservation;
