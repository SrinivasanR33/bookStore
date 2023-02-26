import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import img1 from "../../img/bookimg.jfif";
import { login } from "../../service/LoginService";

function Login() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const submite = () => {
    dispatch(login(userData));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        // backgroundColor: "red",
        height: "100%",
      }}
    >
      <Box
        sx={{
          // flex: 1,
          p: 10,
          borderRadius: 5,
          backgroundColor: "#ffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Box>
        <img alt="Rupy" src={img1} width="500" />
      </Box> */}
        {/* <Grid container>
        <Grid xs={12} md={12} sm={8}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              m: 1,
            }}
            noValidate
            autoComplete="off"
            alignItems={"center"}
          >
            <TextField
              sx={{
                color: "#ffff",
                // "& .MuiFormLabel-root": {
                //   color: "red", // or black
                // },
              }}
              type={"email"}
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              label="Email"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              m: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Password"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              type={"password"}
              variant="outlined"
            />
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box sx={{ p: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch({ type: "MAIN_SCREEN_OPTION", payload: 0 });
                  }}
                >
                  Back
                </Button>
              </Box>
              <Box sx={{ p: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    submite();
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* </Grid>
      </Grid> */}
      </Box>
    </div>
  );
}

export default Login;
