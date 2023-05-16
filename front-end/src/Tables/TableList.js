import React from "react";

function TableList({ tables }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
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
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default TableList;
