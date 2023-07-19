import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, AddUser, Layout, UserVerify, Team, EditUser } from "..";
import { useTypedSelector } from '../../hooks';
import {VacationsRequestTable} from "../../components/UI/Tables/VacationsRequestTable";
import AddVacationForm from "../../components/AddVacationForm/AddVacationForm";
import React from "react";


export const AppRoutes = () => {


  return (
    <Routes>
      {useTypedSelector((state) => state.auth.status) ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/adduser" element={<AddUser />} />
            <Route path="/vacation/create" element={<AddVacationForm />} />
            <Route path="/vacation/requests" element={<VacationsRequestTable />} />
            <Route path="/edit" element={<EditUser/>} />
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