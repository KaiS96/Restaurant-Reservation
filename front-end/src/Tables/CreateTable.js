import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// import utility functions
import { createTable } from "../utils/api";

// import components
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

const initialState = {
  table_name: "",
  capacity: "",
};

function CreateTable() {
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleSubmit = async (newTable) => {
    const abortController = new AbortController();
    try {
      await createTable(newTable);
      history.push(`/dashboard`);
    } catch (error) {
      setErrorMessage(error);
    }
    return () => abortController;
  };

  return (
    <div>
      <h2>Create a Table</h2>
      <ErrorAlert error={errorMessage} />

      <TableForm
        handleSubmit={handleSubmit}
        onCancel={history.goBack}
        submitLabel="Submit"
        cancelLabel="Cancel"
        initialState={initialState}
        error={errorMessage}
      />
    </div>
  );
}

export default CreateTable;
