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
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const response = await listTable(abortController.signal);
      const tableFromAPI = response;
      setTables(() => tableFromAPI);
    }
    loadTables();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async () => {
    const abortController = new AbortController();
    try {
      await seatTable(reservation_id, tableId);
      history.push(`/dashboard`);
    } catch (error) {
      setErrorMessage(error);
    }
    return () => abortController;
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        Table: {table.table_name} - Capacity: {table.capacity}
      </option>
    );
  });

  console.log(tableId);

  return (
    <div>
      <ErrorAlert error={errorMessage} />
      <h2>Select a Table:</h2>
      <select
        className="custom-select w-25 mb-2"
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
          className="btn btn-outline-secondary btn-sm mr-2"
          onClick={history.goBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-outline-primary btn-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TableSelect;
