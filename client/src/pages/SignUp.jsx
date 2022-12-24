import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const baseURL = "http://127.0.0.1:5000/api/v1/";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setPasswordErrText("");
  //   setConfirmPasswordErrText("");

  //   const data = new FormData(e.target);
  //   const username = data.get("username").trim();
  //   const password = data.get("password").trim();
  //   const confirmPassword = data.get("confirmPassword").trim();

  //   let err = false;

  //   if (username === "") {
  //     err = true;
  //     setUsernameErrText("Please fill this field");
  //   }
  //   if (password === "") {
  //     err = true;
  //     setPasswordErrText("Please fill this field");
  //   }
  //   if (confirmPassword === "") {
  //     err = true;
  //     setConfirmPasswordErrText("Please fill this field");
  //   }
  //   if (password !== confirmPassword) {
  //     err = true;
  //     setConfirmPasswordErrText("Confirm password not match");
  //   }

  //   if (err) return;

  //   setLoading(true);

  //   try {
  //     const res = await authApi.signup({
  //       username,
  //       password,
  //       confirmPassword,
  //     });
  //     setLoading(false);
  //     localStorage.setItem("token", res.token);

  //     navigate("/");
  //   } catch (err) {
  //     console.log(err.message);
  //     // const errors = err.data?.errors;
  //     // errors.forEach((e) => {
  //     //   if (e.param === "username") {
  //     //     setUsernameErrText(e.msg);
  //     //   }
  //     //   if (e.param === "password") {
  //     //     setPasswordErrText(e.msg);
  //     //   }
  //     //   if (e.param === "confirmPassword") {
  //     //     setConfirmPasswordErrText(e.msg);
  //     //   }
  //     // });
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText("Confirm password not match");
    }

    if (err) return;

    setLoading(true);

    try {
      const result = await axios
        .post(`${baseURL}/auth/signup`, { username, password, confirmPassword })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data?.token);
          setLoading(false);
          navigate("/");
        })
        .catch((error) => console.error(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="false"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="false"
          disabled={loading}
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account? Login
      </Button>
    </>
  );
};

export default SignUp;
