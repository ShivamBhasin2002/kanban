import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          mt: 1,
        }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          label="Password"
          name="password"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          SignUp
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account? Login Here
      </Button>
    </>
  );
};

export default SignUp;
