import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const initialState = {
  table_name: "",
  capacity: "",
};

function CreateTable() {
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  //   const onCancel = (event) => {
  //     event.preventDefault();
  //     return history.goBack;
  //   };

  const handleSubmit = async (newTable) => {
    const abortController = new AbortController();
    try {
      await createTable(newTable);
      history.push(`/dashboard`);
    } catch (error) {
      setErrorMessage(error);
    }
    return abortController;
  };

  return (
    <div>
      <h2>Create Reservation</h2>
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
