import { useCurrentSelector } from "../../redux";
import { Routes, Route } from 'react-router-dom';
import { Home, Login } from '../../pages'
import { routes } from "./routes";

export const RenderPage = () => {
    const user = useCurrentSelector(state => state.user);

  return (
    <Routes>
      {routes.map((r, i) => {
        if (r.path === '/login' || user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else {
          return <Route key={i} path={r.path} element={<Login />} />;
        }
      })}
    </Routes>
  );
}