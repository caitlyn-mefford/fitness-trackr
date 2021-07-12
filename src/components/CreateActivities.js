import React, { useState } from "react";

import {
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { createActivity } from "../api";

const CreateActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  //From API
  createActivity();

  const onFormSubmit = (event) => {
    event.preventDefault();
    createActivity(activityName, activityDescription);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    btn: {
      fontSize: 20,
      backgroundColor: "#E2725A",
      "&:hover": {
        backgroundColor: "#94ACBF",
      },
    },
    title: {
      marginTop: 20,

      color: "#79AEB2",
      fontSize: 40,
    },
    subTitle: {
      color: "#79AEB2",
      fontSize: 30,
    },
    textField: {
      color: "white",
      backgroundColor: "white",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography
            className={classes.title}
            variant='h6'
            color='secondary'
            component='h2'
            align='center'
            gutterBottom>
            Activities
          </Typography>
          <form
            noValidate
            autoComplete='off'
            onSubmit={onFormSubmit}
            className={classes.form}>
            <TextField
              className={classes.textField}
              required
              id='outlined-required'
              label='Required'
              variant='outlined'
              color='#F9DDD2'
              defaultValue='Name'
              onInput={(event) => {
                setActivityName(event.target.value);
              }}
            />
            <TextField
              className={classes.textField}
              required
              id='outlined-required'
              label='Required'
              variant='outlined'
              color='#F9DDD2'
              defaultValue='Description'
              onInput={(event) => {
                setActivityDescription(event.target.value);
              }}
            />
            <Button
              className={classes.btn}
              type='submit'
              color='secondary'
              variant='contained'
              endIcon={<KeyboardArrowRightIcon />}>
              Create
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};
export default CreateActivity;