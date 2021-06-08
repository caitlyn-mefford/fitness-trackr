import React from "react";
import "./styles.css";
import Navigation from "./Navigation";
import { Route, Switch, Redirect } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      <Redirect exact from='/' to='/home' />
      <Route
        exact
        path='/:page?'
        render={(props) => <Navigation {...props} />}
      />
    </Switch>
  );
}