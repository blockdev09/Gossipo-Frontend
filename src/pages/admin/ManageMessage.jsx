import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Tables from "../../components/Shared/Tables";
import { DashboardData } from "../../constants/data";
import { fileFormat, ImageTransform } from "../../lib/feature";
import moment from "moment";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import Render from "../../components/Shared/Render";
import { useGetAdminMessagesQuery } from "../../redux/api/api";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  // {
  //   field: "avatar",
  //   headerName: "Avatar",
  //   headerClassName: "table-header",
  //   width: 150,
  //   renderCell: (params) => (
  //     <Avatar alt={params.row.name} src={params.row.avatar} />
  //   ),
  // },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"1rem 1.5rem 1rem 1rem"}
        >
          {attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <a
                href={url}
                download
                target="_blank"
                key={index}
                style={{
                  color: "black",
                  display: "inline-block",
                }}
              >
                {Render(file, url)}
              </a>
            );
          })}
        </Box>
      ) : (
        "No Attachments"
      );
    },
  },

  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];
const ManageMessage = () => {
  const { isLoading, isError, error, data } = useGetAdminMessagesQuery();
  // console.log(data);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data?.messages?.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: ImageTransform(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Tables
          heading={"All Messages"}
          rows={rows}
          columns={columns}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default ManageMessage;
