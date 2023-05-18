import React from "react";

function ReservationList({ reservations }) {
  const reservationsMap = reservations.map((reservation, index) => (
    <tr key={index}>
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
        <td>
          <button type="button" className="btn btn-outline-secondary">
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              Seat
            </a>
          </button>
        </td>
      ) : null}
    </tr>
  ));

  return (
    <div>
      <table className="table">
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
