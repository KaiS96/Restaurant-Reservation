import React from "react";

// import components
import CancelReservation from "./CancelReservation";

function ReservationList({ reservations, loadDashboard }) {
  const reservationsMap = reservations.map((reservation, index) => (
    <tr key={reservation.reservation_id}>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      {reservation.status === "booked" ? (
        <React.Fragment>
          <td>
            <a
              href={`/reservations/${reservation.reservation_id}/seat`}
              className="btn btn-outline-primary btn-sm"
            >
              Seat
            </a>
          </td>
          <td>
            <a
              href={`/reservations/${reservation.reservation_id}/edit`}
              className="btn btn-outline-secondary btn-sm"
            >
              Edit
            </a>
          </td>
          <td>
            <CancelReservation
              reservation_id={reservation.reservation_id}
              loadDashboard={loadDashboard}
            />
          </td>
        </React.Fragment>
      ) : null}
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-sm w-75 text-center mb-5">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Number of People</th>
            <th scope="col">Reservation Status</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">{reservationsMap}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
