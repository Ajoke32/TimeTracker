import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  Home, Login, AddUser, Layout,
  UserVerify, Team, EditUser,
  ProtectedRoute, CreateVacation, 
  VacationRequests, NotFound,
  EmailConfirm
} from "..";
import { useTypedSelector } from '@hooks/customHooks';
import { Permission } from '@redux/enums';
import { VacationsTable } from "@components/Tables";

export const AppRoutes = () => {
  const state = useTypedSelector((state) => state.auth);

  return (
    <Routes>
      {state.status ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/team" element={<Outlet />}>
              <Route index element={<Team />} />
              <Route
                path="addUser"
                element={
                  <ProtectedRoute
                    component={<AddUser />}
                    permission={Permission.Create}
                  />
                }
              />
              <Route
                path="editUser/:userId"
                element={
                  <ProtectedRoute
                    component={<EditUser />}
                    permission={Permission.Update}
                  />
                }
              />
            </Route>
            <Route path="/vacation">
              <Route index element={<Navigate to='requests' />} />
              <Route path="create" element={<CreateVacation />} />
              <Route path="requests" element={<VacationRequests />} />
              <Route path="all" element={<VacationsTable />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/userVerify" element={<UserVerify />} />
          <Route path="/emailConfirm" element={<EmailConfirm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};