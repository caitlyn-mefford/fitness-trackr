import axios from "axios";
import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";

const CreateRoutine = ({ myRoutines, setMyRoutines }) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [ setError] = useState(null);

  async function createRoutine(name, goal) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      axios
        .post(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`,
          { name, goal },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({ data }) => {
          const newRoutines = [...myRoutines];
          newRoutines.push(data);
          setMyRoutines(newRoutines);
        });
    } catch (error) {
      console.log(error);
      setError("Routine Name already in use!");
    }
  }
  return (
    <>
      <TextField
        label="name"
        placeholder="routine name"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
      />
      <TextField
        label="goal"
        placeholder="routine goal"
        value={routineGoal}
        onChange={(e) => setRoutineGoal(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          createRoutine(routineName, routineGoal);
        }}
      >
        Create Routine
      </Button>
    </>
  );
};
export default CreateRoutine;













