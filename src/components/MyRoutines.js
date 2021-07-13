import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import RoutineRow from "./RoutineRow";
import CreateRoutine from "./CreateRoutines";
import ActivityForm from "./ActivityForm";
export const ACTIVITIES_ROUTE = "/activities";

const myUsernameFetch = (myToken) => {
  try {
    return axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(({ data: { username } }) => {
        return username;
      });
  } catch (err) {
    console.error(err);
  }
};

const myRoutinesFetch = (username, myToken) => {
  try {
    return axios
      .get(
        `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data, "is there any data???");
        return data;
      });
  } catch (err) {
    console.error(err);
  }
};

const fetchAllActivities = () => {
  try {
    return axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}${ACTIVITIES_ROUTE}`)
      .then(({ data }) => {
        if (data.length) {
          return data;
        }
      });
  } catch (error) {
    console.error(error);
  }
};
const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getMyRoutines() {
      const myToken = JSON.parse(localStorage.getItem("token"));
      if (myToken) {
        const myUsername = await myUsernameFetch(myToken);
        const routines = await myRoutinesFetch(myUsername, myToken);
        const allActivities = await fetchAllActivities();
        if (allActivities.length === 0) {
          return;
        }
        setActivities(allActivities);

        if (routines.length === 0) {
          return;
        }
        setMyRoutines(routines);
      }
    }

    getMyRoutines();
  }, []);

  const onRemoveRoutine = (idx) => {
    const copy = [...myRoutines];
    copy.splice(idx, 1);
    setMyRoutines(copy);
  };

  return (
    <>
      <CreateRoutine myRoutines={myRoutines} setMyRoutines={setMyRoutines} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Goal</TableCell>
              <TableCell align="left">Creator Name</TableCell>
              <TableCell align="left">Is Public</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {myRoutines && myRoutines.map((routine, idx) => {
              return (
                <>
                  <RoutineRow
                    className="Routine-Head"
                    key={routine.id}
                    index={idx}
                    routine={routine}
                    myRoutines={myRoutines}
                    setMyRoutines={setMyRoutines}
                    onRemoveRoutine={() => {
                      onRemoveRoutine(idx);
                    }}
                  />
                  <ActivityForm routine={routine} activities={activities} />
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead className="Activity-Head">
                        <TableRow>
                          <TableCell>Activity Name</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Count</TableCell>
                          <TableCell>Duration</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {routine.activities && routine.activities.map((activity) => {
                          const {
                            name,
                            description,
                            count,
                            duration,
                          } = activity;
                          return (
                            <TableRow className="Activity-Row">
                              <TableCell>{name}</TableCell>
                              <TableCell>{description}</TableCell>
                              <TableCell>{count}</TableCell>
                              <TableCell>{duration}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyRoutines;











