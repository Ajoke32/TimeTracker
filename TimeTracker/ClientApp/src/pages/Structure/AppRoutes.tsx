import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, AddUser, Layout } from "..";
import { useTypedSelector } from '../../hooks';


export const AppRoutes = () => {


  return (
    <Routes>
      {useTypedSelector((state) => state.user.status) ? (
        <>
          
        </>
      ) : (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/adduser" element={<AddUser/>}/>
          </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </>   
      )}
    </Routes>
  );
}