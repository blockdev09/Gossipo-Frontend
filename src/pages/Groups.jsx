import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done,
  Edit as EditIcon,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarComp from "../components/Shared/AvatarComp";
import { Link } from "../components/styles/StyledComponents";
import { chatItems, sampleUsers } from "../constants/data";
import Itemuser from "../components/Shared/Itemuser";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import Loader1 from "../components/layout/Loader";
import {
  useAddGroupMemberMutation,
  useChatDetailsQuery,
  useDeleteChatGroupMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/miscellaneous";
const DeleteDialog = lazy(() => import("../components/dialogbox/DeleteDialog"));
const AddMember = lazy(() => import("../components/dialogbox/AddMember"));
// const isAddMember = false;
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const myGroups = useMyGroupsQuery();
  const dispatch = useDispatch();
  // console.log(myGroups.data);
  const { isAddMember } = useSelector((state) => state.misc);
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  // console.log(groupDetails.data);
  const [renameGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMembers, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatGroupMutation
  );
  // const [addMembers, isLoadingAddMember] = useAsyncMutation(
  //   useAddGroupMemberMutation
  // );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [groupname, setGroupName] = useState("");
  const [groupnameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);
  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setEdit(false);
    };
  }, [groupDetails.data]);
  const navigateback = () => {
    navigate("/");
  };
  const mobile = () => {
    setMobileOpen((prev) => !prev);
  };
  const mobileClose = () => {
    setMobileOpen(false);
  };
  const updateGroupName = () => {
    setEdit(false);
    renameGroup("Updating Group Name...", {
      chatId,
      name: groupnameUpdatedValue,
    });
  };
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setEdit(false);
    };
  }, [chatId]);
  const confirmDelete = () => {
    setDeleteDialog(true);
  };
  const closeDelete = () => {
    setDeleteDialog(false);
  };
  const openAddMember = () => {
    dispatch(setIsAddMember(true));
  };
  const handledelete = () => {
    deleteGroup("Deleting Group...", chatId);
    closeDelete();
    navigate("/groups");
  };
  const removeMemberHandler = (userId) => {
    removeMembers("Removing Member...", { chatId, userId });
  };
  const IconButtons = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={mobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            bgcolor: "rgba(0,0,0,0.9)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
          }}
          onClick={navigateback}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"2rem"}
      padding={"2rem"}
      justifyContent={"center"}
    >
      {edit ? (
        <>
          <TextField
            value={groupnameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4" color={"white"}>
            {groupname}
          </Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const Buttongroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"2rem"}
      padding={{
        xs: "0rem",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={confirmDelete}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMember}
      >
        Add Member
      </Button>
    </Stack>
  );
  return myGroups.isLoading ? (
    <Loader1 />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"#36393f"}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
        bgcolor={"#1e1f22"}
      >
        {IconButtons}
        {groupname && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
              color={"white"}
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0rem",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              // bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <Itemuser
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem 0.3rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                      color: "white",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {Buttongroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMember chatId={chatId} />
        </Suspense>
      )}
      {deleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <DeleteDialog
            open={confirmDelete}
            onclose={closeDelete}
            ondelete={handledelete}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        PaperProps={{
          sx: {
            bgcolor: "#36393f",
          },
        }}
        open={mobileOpen}
        onClose={mobileClose}
      >
        <GroupList
          width={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ width = "100%", myGroups = [], chatId }) => (
  <Stack width={width}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"2rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarComp avatar={avatar} />
        <Typography color={"white"} fontWeight={"600"}>
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
