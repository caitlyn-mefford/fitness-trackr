import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const loginUser = async () => {
    return await axios
      .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/login`, {
        username,
        password,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = `${window.location.origin}/Home`;
        } else {
          setErrorMessage("Something went wrong");
          // show some error message
        }
      })
      .catch((error) => {
        console.log(error);

        setErrorMessage("Something went wrong");
        // set some error message
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <>
      {errorMessage}
      <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
        <TextField
          id='username'
          label='Username'
          onInput={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          id='password'
          type='password'
          label='Password'
          onInput={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type='submit'>Login</Button>
      </form>
    </>
  );
};

export default Login;