// import React from "react";
// import { Error } from "@mui/icons-material";
// import { Container, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// const NotFound = () => {
//   return (
//     <Container>
//       <Stack>
//         <Typography variant="h1">404</Typography>
//         <Typography variant="h3">Not Found</Typography>
//         <Link to="/">Go Back to Home</Link>
//       </Stack>
//     </Container>
//   );
// };

// export default NotFound;


import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={5}
        alignItems="center"
        justifyContent="center"
        textAlign={{ xs: "center", md: "left" }}
      >
        {/* Optional illustration or icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <ErrorOutline
            sx={{ fontSize: { xs: 80, sm: 100 }, color: "error.main" }}
          />
        </Box>

        {/* Text content */}
        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem" },
              color: "error.main",
              fontWeight: "bold",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Oops! The page you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/"
            sx={{ alignSelf: { xs: "center", md: "flex-start" } }}
          >
            Go Back to Home
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;
