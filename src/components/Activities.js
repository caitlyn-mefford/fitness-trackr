import { useEffect, useState } from "react";
import axios from "axios";
import CreateActivity from "./CreateActivities";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
export const ACTIVITIES_ROUTE = "/activities";

const Activities = ({ authenticated }) => {
  const [activities, setActivities] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}${ACTIVITIES_ROUTE}`)
      .then(({ data }) => {
        if (data.length) {
          const newActivities = data;
          setActivities(newActivities.reverse());
        }
      });
  }, []);

  return (
    <>
      <h1>Activites Page</h1>
      {authenticated && (
        <CreateActivity activities={activities} setActivities={setActivities} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {activities && activities.map((activity) => {
                return (
                  <TableRow key={activity.name}>
                    <TableCell component="th" scope="row">
                      {activity.id}
                    </TableCell>
                    <TableCell align="right">{activity.name}</TableCell>
                    <TableCell align="right">{activity.description}</TableCell>
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