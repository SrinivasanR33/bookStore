import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./welcome.css";
function Welcome() {
  const dispatch=useDispatch()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // backgroundColor: "red",
        height: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Box sx={{ m: 1 }}>
          <Typography
            variant="h2"
            sx={{
              background:
                "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Welcome To The Book Store
          </Typography>
        </Box>
        <Box sx={{ pt: 4, textTransform: "capitalize" }}>
          <Button sx={{ textTransform: "capitalize",backgroundColor:'orange',":hover":{
            backgroundColor:'black',
            color:"#fff"
          } }} variant="contained" size="large" onClick={()=>{ dispatch({
            type: "MAIN_SCREEN_OPTION",
            payload: 3,
          });}}>
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Welcome;
