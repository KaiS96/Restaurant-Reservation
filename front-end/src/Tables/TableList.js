import React from "react";
import { finishReservation } from "../utils/api";

function TableList({ tables, loadDashboard }) {
  const handleFinishReservation = async (table_id) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests?\n\n This cannot be undone."
      )
    ) {
      await finishReservation(table_id);
      loadDashboard();
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>

        {tables.map((table, index) => (
          <tbody className="table-group-divider">
            <tr key={index}>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td data-table-id-status={table.table_id}>
                {table.reservation_id !== null ? "Occupied" : "Free"}
              </td>
              {table.reservation_id !== null ? (
                <td>
                  <button
                    data-table-id-finish={table.table_id}
                    onClick={() => handleFinishReservation(table.table_id)}
                  >
                    Finish
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

export default TableList;
