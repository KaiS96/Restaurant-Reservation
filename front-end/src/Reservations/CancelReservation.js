import React from "react";
import { cancelReservation } from "../utils/api";

function CancelReservation({ reservation_id, loadDashboard }) {
  const handleCancel = async () => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation?\nThis cannot be undone."
    );
    if (confirm) {
      await cancelReservation(reservation_id);
      loadDashboard();
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      data-reservation-id-cancel={reservation_id}
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}

export default CancelReservation;
