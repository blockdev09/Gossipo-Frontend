// import { useInputValidation } from "6pp";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import React, { useState } from "react";
// import { sampleUsers } from "../../constants/data";
// import ItemUser from "../Shared/ItemUser";
// const Newgroup = () => {
//   const groupName = useInputValidation("");
//   const theme = useTheme();
//   const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [members, setMembers] = useState(sampleUsers);
//   const [membersSelected, setMembersSelected] = useState([]);
//   const selectMemberHandler = (_id) => {
//     setMembersSelected((prev) =>
//       prev.includes(_id) ? prev.filter((id) => id != _id) : [...prev, _id]
//     );
//   };
//   // console.log(membersSelected);

//   const submit = () => {};
//   const close = () => {};
//   return (
//     <Dialog open onClose={close}>
//       <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
//         <DialogTitle textAlign="center" variant="h5">
//           Make a New Group
//         </DialogTitle>

//         <TextField
//           label="Group Name"
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//         />

//         <Typography variant="body1">Members</Typography>

//         <Stack>
//           {members.map((user) => (
//             <ItemUser
//               user={user}
//               handler={selectMemberHandler}
//               key={user._id}
//               isAdded={membersSelected.includes(user._id)}
//             />
//           ))}
//         </Stack>
//         <Stack direction={"row"} justifyContent={"space-evenly"}>
//           <Button variant="text" color="error" size="large">
//             Cancel
//           </Button>
//           <Button variant="contained" size="large" onClick={submit}>
//             Create
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default Newgroup;
import { useInputValidation } from "6pp";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/data";
import ItemUser from "../Shared/Itemuser";
import { Check, PersonAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/miscellaneous";
import toast from "react-hot-toast";
const Newgroup = () => {
  const groupName = useInputValidation("");
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [members, setMembers] = useState(sampleUsers);
  const [membersSelected, setMembersSelected] = useState([]);
  const errors = [
    {
      isError: isError,
      error: error,
    },
  ];
  useErrors(errors);
  const selectMemberHandler = (_id) => {
    setMembersSelected((prev) =>
      prev.includes(_id) ? prev.filter((id) => id != _id) : [...prev, _id]
    );
  };
  // console.log(membersSelected);

  const submit = () => {
    if (!groupName.value) {
      return toast.error("Group name is required");
    }
    if (membersSelected.length < 2) {
      return toast.error("Please Select atleast 3 Members");
    }
    newGroup("Creating Group...", {
      name: groupName.value,
      members: membersSelected,
    });
    close();
    // console.log(groupName.value, membersSelected);
  };
  const close = () => {
    dispatch(setIsNewGroup(false));
  };
  // console.log(data);

  return (
    <Dialog
      open={isNewGroup}
      onClose={close}
      fullScreen={ismobile}
      PaperProps={{
        sx: {
          borderRadius: ismobile ? 0 : "1.5rem",
          padding: ismobile ? "1rem" : "2.5rem",
          width: "100%",
          maxWidth: ismobile ? "100%" : "32rem",
          maxHeight: ismobile ? "90vh" : "auto",

          margin: 0,
          background: "rgba(30, 31, 34, 0.85)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        },
      }}
    >
      <Stack spacing={3} height={ismobile ? "100dvh" : "auto"}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: ismobile ? "1.3rem" : "1.8rem",
            padding: 0,
            color: "#fff",
          }}
        >
          Create a New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          fullWidth
          value={groupName.value}
          onChange={groupName.changeHandler}
          variant="outlined"
          size="medium"
          sx={{
            input: {
              color: "#fff",
            },
            ".MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#2c2f33",
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.05)",
              "& fieldset": {
                borderColor: "#444",
              },
              "&:hover fieldset": {
                borderColor: "#777",
              },
            },
          }}
        />

        <List
          sx={{
            mt: 1,
            maxHeight: "250px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#232428",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4b5563",
              borderRadius: "4px",
            },
            paddingRight: "4px",
          }}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <ListItem
                key={user?._id}
                sx={{
                  px: 1.5,
                  py: 1.2,
                  borderRadius: "12px",
                  backgroundColor: "#232428",
                  mb: 1.5,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#2e3035",
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => selectMemberHandler(user?._id)}
                    sx={{
                      backgroundColor: membersSelected.includes(user?._id)
                        ? "#10b981"
                        : "#2563eb",
                      color: "white",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: membersSelected.includes(user?._id)
                          ? "#059669"
                          : "#1d4ed8",
                      },
                    }}
                  >
                    {membersSelected.includes(user?._id) ? (
                      <Check size={20} />
                    ) : (
                      <PersonAdd size={20} />
                    )}
                  </IconButton>
                }
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    bgcolor: "#9ca3af",
                  }}
                />
                <ListItemText
                  primary={<Typography color="#fff">{user?.name}</Typography>}
                />
              </ListItem>
            ))
          )}
        </List>

        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          spacing={"1rem"}
          mt={"1.5rem"}
        >
          <Button
            variant="text"
            sx={{
              color: "#ef4444",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.08)",
              },
            }}
            onClick={close}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={submit}
            sx={{
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "500",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
            disabled={isLoadingNewGroup}
          >
            CREATE
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default Newgroup;
