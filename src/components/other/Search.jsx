import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
  Avatar,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon, PersonAdd } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import { sampleUsers } from "../../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/miscellaneous";
import {
  useLazySearchuserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import Itemuser from "../Shared/Itemuser";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchuser] = useLazySearchuserQuery();
  const [sendFriendRequest, isLoadingFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState([]);
  // console.log(sendFriendRequest);

  const addFriend = async (_id) => {
    await sendFriendRequest("Sending friend request...", {
      userId: _id,
    });
  };
  const SerachCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchuser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((error) => console.log(error));
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search.value]);
  return (
    <Dialog
      open={isSearch}
      onClose={SerachCloseHandler}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "1.5rem",
          padding: isMobile ? "1rem" : "2.5rem",
          width: "100%",
          maxWidth: isMobile ? "100%" : "32rem",
          margin: 0,
          background: "rgba(30, 31, 34, 0.85)",
          backdropFilter: "blur(10px)",
          color: "#fff",
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
          Find your Friends!
        </DialogTitle>

        <TextField
          placeholder="Search by Name"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="medium"
          fullWidth
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#bbb" }} />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => ( 
            <Itemuser
              user={user}
              handler={addFriend}
              key={user._id}
              isLoading={isLoadingFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;

// import {
//   Dialog,
//   DialogTitle,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemText,
//   Stack,
//   TextField,
// } from "@mui/material";
// import React, { useState } from "react";
// import { Search as SearchIcon } from "@mui/icons-material";
// import { useInputValidation } from "6pp";
// import ItemUser from "../Shared/ItemUser";
// import { sampleUsers } from "../../constants/data";

// const Search = () => {
//   const search = useInputValidation("");
//   let isLoadingFriendRequest = false;
//   const [users, setUsers] = useState(sampleUsers);
//   const addFriend = (_id) => {
//     console.log(_id);
//   };
//   return (
//     <Dialog open>
//       <Stack padding={"2.5rem"} direction={"column"} width={"26rem"}>
//         <DialogTitle textAlign={"center"}>Find your Friends</DialogTitle>
//         <TextField
//           label=""
//           value={search.value}
//           onChange={search.changeHandler}
//           variant="outlined"
//           size="small"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
// <List>
//   {users.map((user) => (
//     <ItemUser
//       user={user}
//       handler={addFriend}
//       key={user._id}
//       isLoading={isLoadingFriendRequest}
//     />
//   ))}
// </List>
//       </Stack>
//     </Dialog>
//   );
// };

// export default Search;

{
  /* <List sx={{ mt: 1 }}>
{users.map((user) => (
  <ListItem
    key={user._id}
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
        onClick={() => addFriend(user._id)}
        disabled={isLoadingFriendRequest}
        sx={{
          backgroundColor: isLoadingFriendRequest
            ? "#94a3b8"
            : "#2563eb",
          color: "white",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: isLoadingFriendRequest
              ? "#94a3b8"
              : "#1d4ed8",
          },
        }}
      >
        {isLoadingFriendRequest ? (
          <CircularProgress size={20} color="inherit" />
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
      primary={<Typography color="#fff">{user.name}</Typography>}
    />
  </ListItem>
))}
</List> */
}
