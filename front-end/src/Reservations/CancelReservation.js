import React from "react";

// import utility functions
import { cancelReservation } from "../utils/api";

function CancelReservation({ reservation_id, loadDashboard }) {
  const abortController = new AbortController();
  const handleCancel = async () => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation?\nThis cannot be undone."
    );
    if (confirm) {
      await cancelReservation(reservation_id);
      loadDashboard();
    }
    return () => abortController.abort();
  };

  return (
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      data-reservation-id-cancel={reservation_id}
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}

export default CancelReservation;
