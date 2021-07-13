import React, { useState } from "react";
import axios from "axios";

const ActivityForm = ({
  activities,
  routine,
  setMyRoutines,
  myRoutines,
  index,
}) => {
  const [activityId, setActivityId] = useState(0);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);

  async function attachActivity(routineId, activityId, count, duration) {
    console.log(activityId);
    axios
      .post(
        `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines/${routineId}/activities`,
        { activityId, count, duration }
      )
      .then(({ data }) => {
        alert("Refresh page to see activities");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="Activity-Form">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(activityId);
          await attachActivity(routine.id, activityId, count, duration);
        }}
      >
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setActivityId(e.target.value);
          }}
        >
          {activities && activities.map((activity) => {
            return <option value={activity.id}>{activity.name}</option>;
          })}
        </select>
        <input
          type="number"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="submit">Attach Activity</button>
      </form>
    </div>
  );
};

export default ActivityForm;