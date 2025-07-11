import React from "react";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { Face2, AlternateEmail, CalendarMonth } from "@mui/icons-material";
import moment from "moment";
import { ImageTransform } from "../../lib/feature";

const Profile = ({ user }) => {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh-1rem)",
        width: "100%",
        py: 4,
        px: 2,
        // background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        overflowY: "auto", // ✅ enables scrolling
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          height: "50%",
          maxWidth: 400,
          borderRadius: 4,
          padding: 4,
          background: "#1e1f22",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          color: "#fff",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            src={ImageTransform(user?.avatar?.url)}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
            }}
          />
          <ProfileCard heading={"Bio"} text={user?.bio} />
          <ProfileCard
            heading={"Username"}
            text={user?.username}
            Icon={<AlternateEmail />}
          />
          <ProfileCard heading={"Name"} text={user.name} Icon={<Face2 />} />
          <ProfileCard
            heading={"Joined"}
            text={moment(user?.createdAt).fromNow()}
            Icon={<CalendarMonth />}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

const ProfileCard = ({ text, heading, Icon }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        width: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "0.75rem",
        padding: "1rem",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {Icon}
      <Stack>
        <Typography fontWeight={600} fontFamily={"'DM Sans',sans-serif"}>
          {text}
        </Typography>
        <Typography
          variant="caption"
          color="gray"
          fontFamily="'Inter', sans-serif"
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;

// import { Avatar, Stack, Typography } from "@mui/material";
// import React from "react";
// import { Face2, AlternateEmail, CalendarMonth } from "@mui/icons-material";
// import moment from "moment";
// const Profile = () => {
//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//       <Avatar
//         sx={{
//           width: 180,
//           height: 180,
//           objectFit: "contain",
//           marginTop: "2rem",
//           marginBottom: "2rem",
//           border: "5px solid white",
//         }}
//       />
//       <ProfileCard heading={"Bio"} text={"Poetry"} />
//       <ProfileCard
//         heading={"Username"}
//         text={"kindofdevansh"}
//         Icon={<AlternateEmail />}
//       />
//       <ProfileCard heading={"Name"} text={"Devansh Juwar"} Icon={<Face2 />} />
//       <ProfileCard
//         heading={"Joined"}
//         text={moment("2025-03-04T18:30:00.000Z").fromNow()}
//         Icon={<CalendarMonth />}
//       />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, heading, Icon }) => {
//   return (
//     <Stack
//       spacing={"1rem"}
//       direction={"row"}
//       alignItems={"center"}
//       textAlign={"center"}
//       color={"white"}
//     >
//       {Icon && Icon}
//       <Stack>
//         <Typography variant="body1">{text}</Typography>
//         <Typography variant="caption" color={"gray"}>
//           {heading}
//         </Typography>
//       </Stack>
//     </Stack>
//   );
// };

// export default Profile;
