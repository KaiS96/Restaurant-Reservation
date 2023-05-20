import React, { useState } from "react";

// inport utility functions
import { searchByNumber } from "../utils/api";

// import components
import ReservationList from "./ReservationList";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservation() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const searchResults = await searchByNumber(number);
      setReservations(searchResults);
      setNumber("");
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setNumber(target.value);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Find a Reservation</h2>
        <ErrorAlert error={error} />
        <div className="input-group mb-3 w-50">
          <input
            name="mobile_number"
            type="text"
            maxLength="10"
            required={true}
            className="form-control"
            placeholder="Find a Reservation"
            aria-label="Find a Reservation"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={reservations.mobile_number}
          ></input>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Find
            </button>
          </div>
        </div>
      </form>
      <div className="container-fluid col">
        <div className="row d-md-flex mb-3">
          <h4>Search Result</h4>
        </div>
        {reservations.length > 0 ? (
          <div className="row d-md-flex mb-3">
            <ReservationList reservations={reservations} />
          </div>
        ) : (
          <div
            className="row d-md-flex mb-3 alert alert-dark text-center w-50"
            role="alert"
          >
            No reservations found
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchReservation;
