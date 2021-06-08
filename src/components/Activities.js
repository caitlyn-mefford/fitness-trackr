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

const Activities = () => {
  const [activities, setActivities] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/activities`)
      .then(({ data }) => {
        if (data.length) {
          setActivities(data);
        }
      });
  }, []);
  return (
    <>
      <h1>Activities Page</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities &&
              activities.map((activity) => {
                return (
                  <TableRow key={activity.name}>
                    <TableCell component='th' scope='row'>
                      {activity.id}
                    </TableCell>
                    <TableCell align='right'>{activity.name}</TableCell>
                    <TableCell align='right'>{activity.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Activities;