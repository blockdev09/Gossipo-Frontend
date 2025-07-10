import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdminDetails } from "../../redux/createThunks/createThunk";
const Adminlogin = () => {
  const secretKey = useInputValidation("");
  const { isAdmin } = useSelector((state) => state.auth);
  // console.log(isAdmin);
  
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };
  useEffect(()=>{
    dispatch(getAdminDetails())
  },[dispatch])
  if (isAdmin) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Admin Login</Typography>
        <form
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          onSubmit={handlesubmit}
        >
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginTop: "1rem" }}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Adminlogin;
