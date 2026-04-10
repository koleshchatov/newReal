import { Routes, Route, Navigate } from "react-router-dom";
import AccessMatrixPage from "../../pages/accessMatrixPage";
import AuthPage from "../../pages/authPage";
import GuidePage from "../../pages/auidePage";
import NomenclaturePage from "../../pages/nomenclaturePage";
import OpportunitiesPage from "../../pages/opportunitiesPage";
import PersonalPage from "../../pages/personalPage";
import RolePage from "../../pages/rolePage";
import Layout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../auth/authSlice";
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
