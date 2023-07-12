import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, AddUser, Layout, UserVerify } from "..";
import { useTypedSelector } from '../../hooks';
import { Team, TeamLayout } from '../TeamPage';


export const AppRoutes = () => {


  return (
    <Routes>
      {useTypedSelector((state) => state.auth.status) ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/team" element={<TeamLayout/>}>
              <Route index element={<Team/>}/>
              <Route path="adduser" element={<AddUser />} />
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
}