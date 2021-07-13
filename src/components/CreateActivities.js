import axios from "axios";
import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";

const CreateActivity = ({ activities, setActivities }) => {
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [error, setError] = useState(null);

  async function createActivity(name, description) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      axios
        .post(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}activities`,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({ data }) => {
          const newActivities = [...activities];
          newActivities.unshift(data);
          setActivities(newActivities);
        });
    } catch (error) {
      console.log(error);
      setError("Activity Name already in use!");
    }
  }
  return (
    <>
      <TextField
        label="name"
        placeholder="routine name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <TextField
        label="goal"
        placeholder="routine goal"
        value={activityDesc}
        onChange={(e) => setActivityDesc(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          createActivity(activityName, activityDesc);
        }}
      >
        Create Activity
      </Button>
    </>
  );
};
export default CreateActivity;