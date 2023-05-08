import React, { useEffect, useState } from "react";

function ReservationForm({
  onCancel,
  handleSubmit,
  submitLabel,
  cancelLabel,
  initialState,
  error,
}) {
  const [reservationData, setReservationData] = useState(initialState);
  // console.log(initialState)

  const handleReservationUpdate = (event) => {
    if (event.target.name === "people") {
      setReservationData({
        ...reservationData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservationData({
        ...reservationData,
        [event.target.name]: event.target.value,
      });
    }
  };

  //   useEffect(() => {
  //     setReservationData(initialState);
  //   }, [initialState]);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(reservationData);
    if (!error) {
      setReservationData({ ...initialState });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">
          First Name:
          <input
            className="form-control"
            name="first_name"
            id="first_name"
            type="text"
            required={true}
            value={reservationData.first_name}
            placeholder="First Name"
            onChange={handleReservationUpdate}
          />
        </label>
        <br />
        <label htmlFor="last_name">
          Last Name:
          <input
            className="form-control"
            name="last_name"
            id="last_name"
            type="text"
            required={true}
            value={reservationData.last_name}
            placeholder="Last Name"
            onChange={handleReservationUpdate}
          />
        </label>
        <br />
        <label htmlFor="mobile_number">
          Mobile Number:
          <input
            className="form-control"
            name="mobile_number"
            id="mobile_number"
            type="text"
            maxLength="10"
            required={true}
            value={reservationData.mobile_number}
            placeholder="Mobile Number"
            onChange={handleReservationUpdate}
          />
        </label>
        <br />
        <label htmlFor="reservation_date">
          Reservation Date:
          <input
            className="form-control"
            name="reservation_date"
            id="reservation_date"
            type="date"
            required={true}
            value={reservationData.reservation_date}
            placeholder="Reservation Date"
            onChange={handleReservationUpdate}
          />
        </label>
        <br />
        <label htmlFor="reservation_time">
          Reservation Time:
          <input
            className="form-control"
            name="reservation_time"
            id="reservation_time"
            type="time"
            required={true}
            value={reservationData.reservation_time}
            placeholder="Reservation Time"
            onChange={handleReservationUpdate}
          />
        </label>
        <br />
        <label htmlFor="people">
          Number of People:
          <input
            className="form-control"
            name="people"
            id="people"
            type="number"
            required={true}
            value={reservationData.people}
            placeholder="Number of People"
            onChange={handleReservationUpdate}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
