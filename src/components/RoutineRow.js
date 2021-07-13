import React, { useState } from "react";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import {
  Create as CreateIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

export const ROUTINES_ROUTE = "/routines";

const RoutineRow = ({
  routine: { id, name, goal, creatorName, isPublic },
  onRemoveRoutine,
}) => {
  const myToken = JSON.parse(localStorage.getItem("token"));
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [editMode, setEditMode] = useState(false);

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = (id) => {
    setEditMode(false);
    fetch(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}${ROUTINES_ROUTE}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  const onDelete = (id) => {
    onRemoveRoutine();
    fetch(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}${ROUTINES_ROUTE}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  return (
    <>
      <TableRow key={id}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="left">
          {editMode ? (
            <TextField
              value={routineName}
              onChange={(event) => {
                setRoutineName(event.target.value);
              }}
            />
          ) : (
            routineName
          )}
        </TableCell>
        <TableCell align="left">
          {editMode ? (
            <TextField
              value={routineGoal}
              onChange={(event) => {
                setRoutineGoal(event.target.value);
              }}
            />
          ) : (
            routineGoal
          )}
        </TableCell>
        <TableCell align="left">{creatorName}</TableCell>
        <TableCell align="left">{isPublic}</TableCell>
        <TableCell align="left">
          {editMode ? (
            <SaveIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                onSave(id);
              }}
            />
          ) : (
            <CreateIcon style={{ cursor: "pointer" }} onClick={onEdit} />
          )}
        </TableCell>
        <TableCell align="right">
          <DeleteIcon
            onClick={() => {
              onDelete(id);
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoutineRow;