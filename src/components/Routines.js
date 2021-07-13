import { useEffect, useState } from "react";
import axios from "axios";
import "./Routine.css";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
export const ROUTINES_ROUTE = "/routines";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}${ROUTINES_ROUTE}`)
      .then(({ data }) => {
        if (data.length) {
          setRoutines(data);
        }
        console.log(data);
      });
  }, []);

  return (
    <>
      <h1>Routines Page</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Goal</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {routines && routines.map((routine) => {
                return (
                  <>
                    <TableRow key={routine.name} className="Routine-Head">
                      <TableCell component="th" scope="row">
                        {routine.id}
                      </TableCell>
                      <TableCell align="left">{routine.name}</TableCell>
                      <TableCell align="left">{routine.goal}</TableCell>
                    </TableRow>
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

export default Routines;






