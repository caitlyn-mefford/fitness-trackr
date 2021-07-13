import axios from "axios";
import { useEffect, useState } from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";


const Routines = () => {
  const [routines, setRoutines] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`)
      .then(({ data }) => {
        if (data.length) {
          setRoutines(data);
        }
      });
  }, []);
  return (
    <>
      <h1>Routines Page</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Goal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routines &&
              routines.map((routine) => {
                return (
                  <TableRow key={routine.name}>
                    <TableCell component='th' scope='row'>
                      {routine.id}
                    </TableCell>
                    <TableCell align='right'>{routine.name}</TableCell>
                    <TableCell align='right'>{routine.goal}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Routines;