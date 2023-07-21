import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home, Login, AddUser, Layout, UserVerify, Team, EditUser, ProtectedRoute } from "..";
import { useTypedSelector } from '../../hooks';
import { Permission } from '../../redux';
import { CreateVacation, VacationRequests } from '../VacationPage';

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
                <Route index element={<Navigate to='/requests' />} /> // Add main page
                <Route path="create" element={<CreateVacation />}/>
                <Route path="requests" element={<VacationRequests />}/>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/userVerify" element={<UserVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};