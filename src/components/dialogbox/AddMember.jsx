import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleUsers } from "../../constants/data";
import Itemuser from "../Shared/Itemuser";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/miscellaneous";
const AddMember = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );
  const { isLoading, isError, error, data } = useAvailableFriendsQuery(chatId);

  // const [members, setMembers] = useState([]);
  const [membersSelected, setMembersSelected] = useState([]);

  const selectMemberHandler = (_id) => {
    setMembersSelected((prev) =>
      prev.includes(_id) ? prev.filter((_id) => _id !== _id) : [...prev, _id]
    );
  };
  const addMemberSubmitHandler = () => {
    addMember("Adding Members...", { chatId, members: membersSelected });
    closeHandler();
  };
  const closeHandler = () => {
    // setMembers([]);
    // setMembersSelected([]);
    dispatch(setIsAddMember(false));
  };
  // useEffect(() => {
  //   if (data && data.users) {
  //     setMembers(data.users);
  //   }
  // }, [data]);
  // console.log(data);

  useErrors([{ isError, error }]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack padding={"2rem"} spacing={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <Itemuser
                key={i?._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={membersSelected.includes(i?._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          spacing={"1rem"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMember;
