import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { ImageTransform } from "../../lib/feature";
const Itemuser = ({
  user,
  handler,
  isLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ListItem
      disableGutters
      sx={{
        paddingY: "0.5rem",
        paddingX: ismobile ? "0.5rem" : "1rem",
        borderRadius: "0.75rem",
        "&:hover": {
          // backgroundColor: theme.palette.grey[100],
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        },
      }}
    >
      <Stack
        direction={"row"}
        spacing={"2rem"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"space-between"}
        {...styling}
      >
        <Avatar src={ImageTransform(avatar)} />
        <Typography
          variant={ismobile ? "body2" : "body1"}
          sx={{
            flexGrow: "1",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        {}
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "#fff",
            borderRadius: "0.8rem",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handler(_id)}
          disabled={isLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(Itemuser);

// import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { Add as AddIcon } from "@mui/icons-material";
// const Itemuser = ({ user, handler, isLoading }) => {
//   const { name, _id, avatar } = user;
//   return (
//     <ListItem>
//       <Stack
//         direction={"row"}
//         spacing={"2rem"}
//         alignItems={"center"}
//         width={"100%"}
//       >
//         <Avatar />
//         <Typography
//           variant="body1"
//           sx={{
//             flexGrow: "1",
//             display: "-webkit-box",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             WebkitLineClamp: 1,
//             WebkitBoxOrient: "vertical",
//             width: "100%",
//           }}
//         >
//           {name}
//         </Typography>
//         <IconButton
//           size="small"
//           sx={{
//             bgcolor: "primary.main",
//             color: "white",
//             "&:hover": {
//               bgcolor: "primary.dark",
//             },
//           }}
//           onClick={() => handler(_id)}
//           disabled={isLoading}
//         >
//           <AddIcon />
//         </IconButton>
//       </Stack>
//     </ListItem>
//   );
// };
