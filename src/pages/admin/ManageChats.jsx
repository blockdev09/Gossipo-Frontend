import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Tables from "../../components/Shared/Tables";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { DashboardData } from "../../constants/data";
import { ImageTransform } from "../../lib/feature";
import AvatarComp from "../../components/Shared/AvatarComp";
import { useGetadminChatsQuery } from "../../redux/api/api";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarComp avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarComp max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem "} alignItems={"center"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ManageChats = () => {
  const { isLoading, isError, error, data } = useGetadminChatsQuery();
  // console.log(data);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data?.chats?.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => ImageTransform(i, 50)),
          members: i.members.map((i) => ImageTransform(i.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: ImageTransform(i.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Tables rows={rows} columns={columns} heading={"All Chats"} />
      )}
    </AdminLayout>
  );
};

export default ManageChats;
