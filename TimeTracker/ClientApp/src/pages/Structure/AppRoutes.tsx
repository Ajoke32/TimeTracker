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
import { Tracker } from "../TrackerPage/Tracker";
import Calendar from "../CalendarPage/Calendar";
import VacationDetails from "@components/Cards/VacationDetails.tsx";

export const AppRoutes = () => {
  const state = useTypedSelector((state) => state.auth);

  return (
    <Routes>
      {state.status ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route path="/calendar" element={<Calendar />} />
            <Route index element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/team" element={<Outlet />}>
              <Route index element={<Team />} />
              <Route path="addUser"
                element={
                  <ProtectedRoute
                    component={<AddUser />}
                    permission={Permission.Create}
                  />
                }
              />
              <Route path="editUser/:userId"
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
              <Route path="details/:id" element={<VacationDetails />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
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