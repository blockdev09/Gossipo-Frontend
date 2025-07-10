import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useInputValidation, useStrongPassword, useFileHandler } from "6pp";
import { usernameValidator } from "../utils/Validator";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
const Login = () => {
  const [islogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const tooglelogin = () => {
    setIsLogin((prev) => !prev);
  };
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const password = useStrongPassword("");
  const username = useInputValidation("", usernameValidator);
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();
  const handlelogin = async (e) => {
    e.preventDefault();
    const toastid = toast.loading("Logging in...");
    setLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastid,
      });
    } catch (error) {
      // console.log(error.response.data.message);
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastid,
      });
    } finally {
      setLoading(false);
    }
  };
  const handlesignup = async (e) => {
    e.preventDefault();
    const toastid = toast.loading("Signing Up...");
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // console.log(formData);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      // console.log(data);

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastid,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastid,
      });
    } finally {
      setLoading(false);
    }
  };
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
        {islogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handlelogin}
            >
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={loading}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="text"
                onClick={tooglelogin}
                disabled={loading}
              >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handlesignup}
            >
              <Stack width={"10rem"} margin={"auto"} position={"relative"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.5)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography
                  m={"1rem"}
                  width={"fit-content"}
                  display={"block"}
                  color="error"
                  variant="caption"
                >
                  {avatar.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              {password.error && (
                <Typography color="error" variant="caption">
                  {password.error}
                </Typography>
              )}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={loading}
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="text"
                onClick={tooglelogin}
                disabled={loading}
              >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
