import {
  AdminPanelSettings,
  Notifications as NotificationIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/other/Chart";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import Loader1 from "../../components/layout/Loader";
import { useGetStatsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";

const DashBoard = () => {
  // const { loading, data, error } = useFetchData(
  //   `${server}/api/v1/admin/stats`,
  //   {
  //     withCredentials: true,
  //   },
  //   "dashboard-stats"
  // );

  // console.log({ loading, data, error });

  // console.log(data);
  const { data, isError, isLoading, error } = useGetStatsQuery();
  // console.log(data);
  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        p: { xs: "1rem", sm: "1.5rem", md: "2rem" },
        my: { xs: "1rem", sm: "2rem" },
        borderRadius: "1rem",
        bgcolor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: "1rem" }}
        alignItems={{ xs: "stretch", md: "center" }}
        flexWrap="wrap"
      >
        <AdminPanelSettings
          sx={{
            fontSize: "2rem",
            alignSelf: { xs: "center", md: "auto" },
            color: "#00fff7",
            textShadow: "0 0 5px #00fff7, 0 0 10px #00fff7",
            transition: "text-shadow 0.3s ease",
            "&:hover": {
              textShadow: "0 0 8px #00fff7, 0 0 15px #00fff7",
            },
          }}
        />

        <SearchField
          placeholder="Search..."
          sx={{
            flexGrow: 1,
            minWidth: { xs: "100%", sm: "200px", md: "250px" },
          }}
        />

        <CurveButton
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Search
        </CurveButton>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />

        <Typography
          color="white"
          textAlign={{ sm: "left" }}
          display={{ xs: "none", sm: "block" }}
          sx={{
            fontSize: { sm: "1rem" },
            mt: { sm: 0 },
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationIcon
          sx={{
            fontSize: "1.8rem",
            alignSelf: { xs: "center", md: "auto" },
            color: "#00fff7",
            textShadow: "0 0 5px #00fff7, 0 0 10px #00fff7",
            transition: "text-shadow 0.3s ease",
          }}
        />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "column",
        md: "row",
      }}
      sx={{
        gap: "1rem",
      }}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="stretch"
      my="2rem"

      // bgcolor={"black"}
    >
      <Widget
        title={"Users"}
        value={data?.stats?.usersCount}
        Icon={<PersonIcon />}
      />
      <Widget
        title={"Chats"}
        value={data?.stats?.groupsCount}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={data?.stats?.messagesCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  // console.log(data);

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container maxWidth="xl">
          {AppBar}

          <Stack
            direction={{ xs: "column", lg: "row" }}
            // spacing={"2rem"}
            flexWrap={"wrap"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
            justifyContent={"center"}
          >
            <Paper
              elevation={4}
              sx={{
                p: { xs: "1.5rem", sm: "2rem", md: "2rem 3.5rem" },
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
                flex: "1 1 100%",
                //   height: { xs: "20rem", sm: "25rem" },
                boxSizing: "border-box",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Typography
                my={"2rem"}
                variant="h4"
                fontSize={{ xs: "1.5rem", sm: "2rem" }}
                textAlign={{ xs: "center", sm: "left" }}
                color={"white"}
              >
                Last Messages
              </Typography>
              <LineChart value={data?.stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={4}
              sx={{
                p: { xs: "1rem", sm: "1.5rem" },
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "25rem",
                flex: "1 1 100%",
                position: "relative",
                overflow: "hidden",
                // height: { xs: "20rem", sm: "25rem" },
                mt: { xs: "2rem", sm: "2rem", md: 0 },
                bgcolor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <DoughnutChart
                value={[
                  data?.stats?.totalchatsCount - data?.stats?.groupsCount || 0,
                  data?.stats?.groupsCount || 0,
                ]}
                labels={["Single Chats", "Group Chats"]}
              />
              <Stack
                position="absolute"
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing="1rem"
                width="100%"
                height="100%"
                px="1rem"
                flexWrap="wrap"
              >
                <GroupIcon sx={{ fontSize: { xs: "2rem", sm: "3rem" } }} />
                <Typography
                  fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                  fontWeight="bold"
                >
                  VS
                </Typography>
                <PersonIcon sx={{ fontSize: { xs: "2rem", sm: "3rem" } }} />
              </Stack>
            </Paper>
          </Stack>

          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: "1.5rem",
        borderRadius: "1rem",
        minWidth: { xs: "100%", sm: "15rem", md: "18rem" },
        flex: "1 1 auto",
        margin: "2rem 0",
        bgcolor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <Stack
        alignItems={"center"}
        sx={{
          gap: "2rem",
        }}
      >
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: `5px solid rgba(0,0,0,0.9)`,
            width: "5rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"0.5rem"}
          color={"white"}
        >
          {Icon}
          <Typography
            fontSize={{ xs: "1rem", sm: "1.125rem" }}
            fontWeight="500"
            color={"white"}
          >
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DashBoard;
