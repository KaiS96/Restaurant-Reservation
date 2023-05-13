import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const initialState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

function CreateReservation() {
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  //   const onCancel = (event) => {
  //     event.preventDefault();
  //     return history.goBack;
  //   };

  const handleSubmit = async (newReservation) => {
    const abortController = new AbortController();
    try {
      const createdReservation = await createReservation(newReservation);
      history.push(`/dashboard?date=${createdReservation.reservation_date}`);
    } catch (error) {
      setErrorMessage(error);
    }
    return abortController;
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      <ErrorAlert error={errorMessage} />

      <ReservationForm
        handleSubmit={handleSubmit}
        onCancel={history.goBack}
        submitLabel="Submit"
        cancelLabel="Cancel"
        initialState={initialState}
        error={errorMessage}
      />
    </div>
  );
}

export default CreateReservation;
