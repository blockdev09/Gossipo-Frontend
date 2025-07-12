import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server}/api/v1/admin/verify`,
      { secretKey },
      config
    );
    // console.log(data.message);

    return data.message;
  } catch (error) {
    console.log(error.response.data.message);

    throw error.response.data.message;
  }
});

const getAdminDetails = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin`, {
      withCredentials: true,
    });
    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

const adminLogout = createAsyncThunk("admin/adminLogout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });
    // console.log(data.message);

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin, getAdminDetails, adminLogout };
