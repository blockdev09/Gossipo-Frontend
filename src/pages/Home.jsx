import { Box, Typography } from "@mui/material";
import React from "react";
import Applayout from "../components/layout/Applayout";

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={"#292a2e"}>
      <Typography
        padding={"2rem"}
        textAlign={"center"}
        variant="h5"
        color={"white"}
      >
        Select a Friend to Chat
      </Typography>
    </Box>
  );
};

export default Applayout()(Home);
