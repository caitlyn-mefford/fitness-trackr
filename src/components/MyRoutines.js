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
        return data;
      });
  } catch (err) {
    console.error(err);
  }
};

const MyRoutines = () => {
  let myUsername;
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(async () => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      myUsername = await myUsernameFetch(myToken);
      const routines = await myRoutinesFetch(myUsername, myToken);
      setMyRoutines(routines);
    }
  }, []);

  const onRemoveRoutine = (idx) => {
    const copy = [...myRoutines];
    copy.splice(idx, 1);
    setMyRoutines(copy);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Goal</TableCell>
            <TableCell align='right'>Creator Name</TableCell>
            <TableCell align='right'>Is Public</TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {myRoutines && myRoutines.map((routine, idx) => {
            return (
              <RoutineRow
                key={routine.id}
                routine={routine}
                onRemoveRoutine={() => {
                  onRemoveRoutine(idx);
                }}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyRoutines;