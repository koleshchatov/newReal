import React from "react";
import "./App.css";
import Userfront, { SignupForm } from "@userfront/toolkit/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AccessMatrixPage from "../Pages/AccessMatrixPage";
import AuthPage from "../Pages/AuthPage";
import GuidePage from "../Pages/GuidePage";
import NomenclaturePage from "../Pages/NomenclaturePage";
import OpportunitiesPage from "../Pages/OpportunitiesPage";
import PersonalPage from "../Pages/PersonalPage";
import RolePage from "../Pages/RolePage";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Пользователи</Link>
            </li>
            <li>
              <Link to="/rolePage">Роли</Link>
            </li>
            <li>
              <Link to="/opportunitiesPage">Возможности</Link>
            </li>
            <li>
              <Link to="/accessMatrixPage">Матрица доступов</Link>
            </li>
            <li>
              <Link to="/nomenclaturePage">Номенклатура</Link>
            </li>
            <li>
              <Link to="/guidePage">Справочники</Link>
            </li>
            <li>
              <Link to="/authPage">Авторизация</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PersonalPage />} />
          <Route path="/rolePage" element={<RolePage />} />
          <Route path="/opportunitiesPage" element={<OpportunitiesPage />} />
          <Route path="/accessMatrixPage" element={<AccessMatrixPage />} />
          <Route path="/nomenclaturePage" element={<NomenclaturePage />} />
          <Route path="/guidePage" element={<GuidePage />} />
          <Route path="/authPage" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}
