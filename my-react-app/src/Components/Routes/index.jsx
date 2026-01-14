import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import AccessMatrixPage from "../../Pages/AccessMatrixPage";
import AuthPage from "../../Pages/AuthPage";
import GuidePage from "../../Pages/GuidePage";
import NomenclaturePage from "../../Pages/NomenclaturePage";
import OpportunitiesPage from "../../Pages/OpportunitiesPage";
import PersonalPage from "../../Pages/PersonalPage";
import RolePage from "../../Pages/RolePage";
import Layout from "../Layout";
import Menu from "../Menu";

export default function App() {
  const [auth, isAuth] = useState(false);

  if (!auth)
    return (
      <Routes>
        <Route path="/authPage" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/authPage" replace />} />
      </Routes>
    );
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PersonalPage />} />
        <Route path="/rolePage" element={<RolePage />} />
        <Route path="/opportunitiesPage" element={<OpportunitiesPage />} />
        <Route path="/accessMatrixPage" element={<AccessMatrixPage />} />
        <Route path="/nomenclaturePage" element={<NomenclaturePage />} />
        <Route path="/guidePage" element={<GuidePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
