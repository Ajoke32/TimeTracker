import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home, Login, AddUser, Layout, UserVerify, Team, EditUser, ProtectedRoute } from "..";
import { useTypedSelector } from '../../hooks';
import { VacationsRequestTable, AddVacationForm,VacationsTable } from "../../components";
import { Permission } from '../../redux';

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
            <Route path="/vacation/create" element={<AddVacationForm />} />
            <Route path="/vacation/requests" element={<VacationsRequestTable />} />
            <Route path="/vacations" element={<VacationsTable  />} />
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