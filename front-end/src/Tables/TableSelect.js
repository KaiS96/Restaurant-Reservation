import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { listTable, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableSelect() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tableId, setTableId] = useState();
  const [tables, setTables] = useState([]);
  // const [reservation, setReservation] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const response = await listTable();
      const tableFromAPI = response;
      setTables(() => tableFromAPI);
    }
    loadTables();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async (event) => {
    // event.prevent.default();
    const abortController = new AbortController();
    try {
      await seatTable(reservation_id, tableId);
      history.push(`/dashboard`);
    } catch (error) {
      setErrorMessage(error);
    }
    return abortController;
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  console.log(tableId);

  return (
    <div>
      <ErrorAlert error={errorMessage} />
      <select
        className="table_id"
        required={true}
        name="table_id"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option defaultValue={0}>Select a table:</option>

        {tableOptions}
      </select>
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={history.goBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TableSelect;
