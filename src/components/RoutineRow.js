import React, { useState, useEffect } from "react";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import {
  Create as CreateIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { getActivities } from "../api";
const FITNESS_TRACKR_API_URL='https://fitnesstrac-kr.herokuapp.com/api/'


const RoutineRow = ({
  routine: { id, name, goal, creatorName, isPublic },
  onRemoveRoutine,
}) => {
  const myToken = JSON.parse(localStorage.getItem("token"));
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [editMode, setEditMode] = useState(false);
  const [activity, setActivity] = useState("");
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    getActivities()
      .then((activitiesList) => {
        setActivitiesList(activitiesList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setActivitiesList]);

  const HandleFormSubmit = (event) => {
    event.preventDefault();
    const selectedIndex = event.target.options.selectedIndex;
    const id = event.target.options[selectedIndex].getAttribute("data-key");
  };

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = (id) => {
    setEditMode(false);
    fetch(`${FITNESS_TRACKR_API_URL}routines/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        name: routineName,
        goal: routineGoal,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  const onDelete = (id) => {
    onRemoveRoutine();
    fetch(`${FITNESS_TRACKR_API_URL}routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  return (
    <TableRow key={id}>
      <TableCell component='th' scope='row'>
        {id}
      </TableCell>
      <TableCell align='right'>
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
      <TableCell align='right'>
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
      <TableCell align='right'>{creatorName}</TableCell>
      <TableCell align='right'>{isPublic}</TableCell>

      <fieldset style={{ width: "15px" }}>
        <label htmlFor='select-activity'></label>
        <select
          value={activity}
          onChange={(event) => {
            setActivity({ HandleFormSubmit });
          }}>
          <option value='add activity'>Add Activity</option>
          {activitiesList.map((activity) => (
            <option
              key={activity.id}
              value={activity.name}
              data-key={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </fieldset>
      <TableCell align='right'>
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
      <TableCell align='right'>
        <DeleteIcon
          onClick={() => {
            onDelete(id);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default RoutineRow;