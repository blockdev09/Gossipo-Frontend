import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { samplenotifications } from "../../constants/data";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscellaneous";
import toast from "react-hot-toast";

const Notification = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { data, error, isError, isLoading } = useGetNotificationsQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const handler = async ({ _id, accept }) => {
    // console.log(_id, accept);
    dispatch(setIsNotification(false));
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use Sockets");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  useErrors([{ error, isError }]);
  // console.log(data?.requests);
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };
  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      // fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "1.5rem",
          padding: isMobile ? "1rem" : "2.5rem",
          width: "100%",
          maxWidth: isMobile ? "100%" : "32rem",
          margin: isMobile ? 0 : "auto",
          height: isMobile ? "100dvh" : "auto",
          background: "rgba(30, 31, 34, 0.85)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          overflow: "hidden",
        },
      }}
    >
      <Stack spacing={3} height={isMobile ? "100dvh" : "auto"}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isMobile ? "1.3rem" : "1.8rem",
            padding: 0,
            color: "#fff",
          }}
        >
          Notifications
        </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <DialogContent sx={{ padding: 0 }}>
            <Stack spacing={2}>
              {data?.requests.length > 0 ? (
                data?.requests.map((i) => (
                  <ItemNotification
                    sender={i.sender}
                    _id={i._id}
                    handler={handler}
                    key={i._id}
                  />
                ))
              ) : (
                <Typography textAlign="center" color="#ccc">
                  No Notifications
                </Typography>
              )}
            </Stack>
          </DialogContent>
        )}
      </Stack>
    </Dialog>
  );
};

const ItemNotification = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ListItem
      disableGutters
      sx={{
        padding: isMobile ? "0.75rem" : "1rem",
        borderRadius: "0.75rem",
        backgroundColor: "#232428",
        mb: 1,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#2e3035",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        width="100%"
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center" flex={1}>
          <Avatar src={avatar} sx={{ bgcolor: "#9ca3af" }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.4,
              color: "#fff",
            }}
          >
            <b>{name}</b> sent you a friend request.
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          mt={isMobile ? 1 : 0}
        >
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              color: "white",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            sx={{
              textTransform: "none",
              borderColor: "#ef4444",
              color: "#ef4444",
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              },
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;

// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   ListItem,
//   Stack,
//   Typography,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";
// import React, { memo } from "react";
// import { samplenotifications } from "../../constants/data";

// const Notification = () => {
//   const theme = useTheme();
//   const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const handler = ({ _id, accept }) => {};
//   return (
//     <Dialog open fullScreen={ismobile} maxWidth="sm" fullWidth>
//       <DialogTitle textAlign="center">Notifications</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} padding={ismobile ? "1rem" : "2rem"}>
//           {samplenotifications.length > 0 ? (
//             samplenotifications.map((i) => (
//               <ItemNotification
//                 sender={i.sender}
//                 _id={i._id}
//                 handler={handler}
//                 key={i._id}
//               />
//             ))
//           ) : (
//             <Typography textAlign="center">No Notifications</Typography>
//           )}
//         </Stack>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const ItemNotification = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;
//   const theme = useTheme();
//   const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
//   return (
//     <ListItem
//       disableGutters
//       sx={{
//         padding: ismobile ? "0.75rem" : "1rem",
//         borderRadius: "0.75rem",
//         bgcolor: theme.palette.background.paper,
//         boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//         flexDirection: "column",
//         gap: ismobile ? 1 : 0,
//         alignItems: "flex-start",
//         "&:hover": {
//           backgroundColor: theme.palette.grey[100],
//         },
//       }}
//     >
//       <Stack
//         direction={ismobile ? "column" : "row"}
//         spacing={2}
//         width="100%"
//         alignItems={ismobile ? "flex-start" : "center"}
//         justifyContent="space-between"
//       >
//         <Stack direction="row" spacing={2} alignItems="center" flex={1}>
//           <Avatar src={avatar} />
//           <Typography
//             variant="body2"
//             sx={{
//               wordBreak: "break-word",
//               fontSize: "0.95rem",
//               lineHeight: 1.4,
//               color: "text.primary",
//               flexGrow: 1,
//             }}
//           >
//             <b>{name}</b> sent you a friend request.
//           </Typography>
//         </Stack>
//         <Stack
//           direction={ismobile ? "row" : "row"}
//           spacing={1}
//           justifyContent={ismobile ? "flex-end" : "flex-start"}
//           mt={ismobile ? 1 : 0}
//         >
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() => handler({ _id, accept: true })}
//           >
//             Accept
//           </Button>
//           <Button
//             size="small"
//             variant="outlined"
//             color="error"
//             onClick={() => handler({ _id, accept: false })}
//           >
//             Reject
//           </Button>
//         </Stack>
//       </Stack>
//     </ListItem>
//   );
// });

// export default Notification;
