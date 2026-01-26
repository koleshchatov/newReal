import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AccessMatrixPage from "../../pages/accessMatrixPage";
import AuthPage from "../../pages/authPage";
import GuidePage from "../../pages/auidePage";
import NomenclaturePage from "../../pages/nomenclaturePage";
import OpportunitiesPage from "../../pages/opportunitiesPage";
import PersonalPage from "../../pages/personalPage";
import RolePage from "../../pages/rolePage";
import Layout from "../layout";

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
