import React from "react";

function TableList({ tables, handleFinishReservation }) {
  const tablesMap = tables.map((table, index) => (
    <tr key={index}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id !== null ? "Occupied" : "Free"}
      </td>
      {table.reservation_id !== null ? (
        <td>
          <button
            typ="button"
            className="btn btn-outline-secondary btn-sm"
            data-table-id-finish={table.table_id}
            onClick={() =>
              handleFinishReservation(table.table_id, table.reservation_id)
            }
          >
            Finish
          </button>
        </td>
      ) : null}
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-sm w-75 text-center">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">{tablesMap}</tbody>
      </table>
    </div>
  );
}

export default TableList;
