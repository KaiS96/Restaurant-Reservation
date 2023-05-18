import React from "react";

function ReservationList({ reservations }) {
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

        {reservations.map((reservation, index) => (
          <tbody className="table-group-divider">
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
                  <button>
                    <a
                      href={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      Seat
                    </a>
                  </button>
                </td>
              ) : null}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ReservationList;
