import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import Loader1 from "./components/layout/Loader"
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { SocketProvider } from "./socket";
const Home = lazy(() => import("./pages/Home"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Adminlogin = lazy(() => import("./pages/admin/Adminlogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const ManageChats = lazy(() => import("./pages/admin/ManageChats"));
const ManageMessage = lazy(() => import("./pages/admin/ManageMessage"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  // console.log(user);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(server);
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <Loader1 />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader1 />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/users-management" element={<ManageUsers />} />
          <Route path="/admin/chats-management" element={<ManageChats />} />
          <Route path="/admin/messages" element={<ManageMessage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
