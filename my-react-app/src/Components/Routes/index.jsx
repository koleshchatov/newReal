import { Routes, Route, Navigate } from "react-router-dom";
import AccessMatrixPage from "../../Pages/AccessMatrixPage/index.jsx";
import AuthPage from "../../Pages/AuthPage/index.jsx";
import GuidePage from "../../Pages/GuidePage/index.jsx";
import NomenclaturePage from "../../Pages/NomenclaturePage/index.jsx";
import OpportunitiesPage from "../../Pages/OpportunitiesPage/index.jsx";
import PersonalPage from "../../Pages/PersonalPage/index.jsx";
import RolePage from "../../Pages/RolePage/index.jsx";
import Layout from "../Layout/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../auth/authSlice.jsx";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const { isLoadingAuth, authentication } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoadingAuth) {
    return <h2>Проверка авторизации...</h2>;
  }

  return (
    <Routes>
      <Route
        path="/authPage"
        element={
          authentication ? <Navigate to="/users" replace /> : <AuthPage />
        }
      />
      <Route
        element={
          authentication ? <Layout /> : <Navigate to="/authPage" replace />
        }
      >
        <Route path="/users" element={<PersonalPage />} />
        <Route path="/rolePage" element={<RolePage />} />
        <Route path="/opportunitiesPage" element={<OpportunitiesPage />} />
        <Route path="/accessMatrixPage" element={<AccessMatrixPage />} />
        <Route path="/nomenclaturePage" element={<NomenclaturePage />} />
        <Route path="/guidePage" element={<GuidePage />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Route>
    </Routes>
  );
}
