import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
const Tables = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 3rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          height: "100%",
          overflow: "auto",
          boxShadow: "none",
          bgcolor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
          color={"white"}
          fontFamily={"'DM Sans',sans-serif"}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
            // backgroundColor:"black"
            // bgcolor: "rgba(255, 255, 255, 0.05)",
          }}
          sx={{
            border: "none",
            ".table-header": {
              bgcolor: "black",
              color: "white",
            },
            // bgcolor: "rgba(255, 255, 255, 0.05)",
          }}
        />
      </Paper>
    </Container>
  );
};

export default Tables;
