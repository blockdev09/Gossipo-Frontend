import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Tables from "../../components/Shared/Tables";
import { Avatar, Skeleton } from "@mui/material";
import { DashboardData } from "../../constants/data";
import { ImageTransform } from "../../lib/feature";
import { useGetadminUsersQuery } from "../../redux/api/api";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const ManageUsers = () => {
  const { isLoading, isError, error, data } = useGetadminUsersQuery();
  // console.log(data);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data?.transformedUsers?.map((i) => ({
          ...i,
          id: i._id,
          avatar: ImageTransform(i.avatar, 50),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Tables rows={rows} columns={columns} heading={"All Users"} />
      )}
    </AdminLayout>
  );
};

export default ManageUsers;
