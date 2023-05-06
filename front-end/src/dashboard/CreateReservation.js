import React from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function CreateReservation() {
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  //   const [formData, setFormData] = useState({ ...initialState });

  const history = useHistory();

  //   const onCancel = (event) => {
  //     event.preventDefault();
  //     return history.goBack;
  //   };

  const handleSubmit = async (newRevseration) => {
    const createdReservation = await createReservation(newRevseration);
    history.push(`/dashboard?date=${createdReservation.reservation_date}`);
  };

  //   const handleSubmit = (event) => {
  //     // event.preventDefault();
  //     const createdReservation = { ...initialState };
  //     async function createRes() {
  //       try {
  //         const finishedReservation = await createReservation(createdReservation);
  //         history.push(`/${finishedReservation}`);
  //       } catch (error) {
  //         throw error;
  //       }
  //     }
  //     createRes();
  //     console.log("submitted", initialState);
  //   };

  return (
    <div>
      <h2>Create Reservation</h2>

      <ReservationForm
        handleSubmit={handleSubmit}
        onCancel={history.goBack}
        submitLabel="Submit"
        cancelLabel="Cancel"
        initialState={initialState}
      />
    </div>
  );
}

export default CreateReservation;
