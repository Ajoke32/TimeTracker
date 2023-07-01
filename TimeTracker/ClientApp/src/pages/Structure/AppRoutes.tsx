import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Layout } from "..";
import { useCurrentSelector } from '../../hooks';


export const AppRoutes = () => {


  return (
    <Routes>
      {useCurrentSelector((state) => state.user.status) ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}