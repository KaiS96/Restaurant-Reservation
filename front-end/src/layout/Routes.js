import React from "react";

import NotFound from "./NotFound";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

import CreateReservation from "../Reservations/CreateReservation";
import CreateTable from "../Tables/CreateTable";
import Dashboard from "../dashboard/Dashboard";
import TableSelect from "../Tables/TableSelect";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <TableSelect />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
