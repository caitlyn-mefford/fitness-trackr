import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import {
  routines,
  home,
  myroutines,
  activities,
  login,
  register,
} from "./components";

const Navigation = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "home",
    1: "routines",
    2: "my-routines",
    3: "activities",
    4: "login",
    5: "register",
  };

  const indexToTabName = {
    home: 0,
    routines: 1,
    myRoutines: 2,
    activities: 3,
    login: 4,
    register: 5,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position='static'>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label='Home' />
          <Tab label='Routines' />
          <Tab label='My Routines' />
          <Tab label='Activities' />
          <Tab label='Login' />
          <Tab label='Register' />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <home />}
      {selectedTab === 1 && <routines />}
      {selectedTab === 2 && <myroutines />}
      {selectedTab === 3 && <activities />}
      {selectedTab === 4 && <login />}
      {selectedTab === 5 && <register />}
    </>
  );
};

export default Navigation;