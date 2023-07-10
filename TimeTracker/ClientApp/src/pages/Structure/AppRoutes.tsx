import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, AddUser, Layout, EmailVerify } from "..";
import { useTypedSelector } from '../../hooks';
import Team from "../TeamPage/Team";


export const AppRoutes = () => {


  return (
    <Routes>
      {useTypedSelector((state) => state.auth.status) ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/adduser" element={<AddUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/emailVerify" element={<EmailVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}