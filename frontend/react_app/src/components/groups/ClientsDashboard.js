import React, { Fragment } from "react";
import ClientsForm from "./ClientsForm";
import ClientsLists from "./ClientsLists";
export default function ClientDashboard() {
  return (
    <Fragment>
      <ClientsForm />
      <ClientsLists />
    </Fragment>
  );
}
