import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import RegisterSucces from "./pages/public/RegisterSucces";

import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import EducationPage from "./pages/admin/EducationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const isAuthenticated = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/user-skills" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-succes" element={<RegisterSucces />} />
        {/* {isAuthenticated ? ( */}
          <Route path="" element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/educations" element={<EducationPage />} />
          </Route>
        {/* ) : null} */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
