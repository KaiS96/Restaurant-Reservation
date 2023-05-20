import React, { useState } from "react";

function TableForm({
  onCancel,
  handleSubmit,
  submitLabel,
  cancelLabel,
  initialState,
  error,
}) {
  const [tableData, setTableData] = useState({ ...initialState });

  const handleTableUpdate = (event) => {
    if (event.target.name === "capacity") {
      setTableData({
        ...tableData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setTableData({
        ...tableData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(tableData);
    if (!error) {
      setTableData({ ...initialState });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="table_name">
          Table Name:
          <input
            className="form-control"
            name="table_name"
            id="table_name"
            type="text"
            required={true}
            value={tableData.table_name}
            placeholder="Table Name"
            onChange={handleTableUpdate}
          />
        </label>
        <br />
        <label htmlFor="capacity">
          Capacity:
          <input
            className="form-control"
            name="capacity"
            id="capacity"
            type="number"
            required={true}
            value={tableData.capacity}
            placeholder="Capacity"
            onChange={handleTableUpdate}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TableForm;
