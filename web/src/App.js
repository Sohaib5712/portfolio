import React, { useState, useEffect } from "react";
import Home from "./page/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Resume from "./page/Resume";
import { Contact, PortfolioMe, ProjectDetail } from "./page";
import Login from "./page/account/Login";
import { Projects } from "./admin/pages";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { project_user, loading: userLoading } = useAuthContext();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!userLoading) {
      setAuthChecked(true);
    }
  }, [userLoading]);

  if (!authChecked) {
    // Hier kann bei Bedarf ein Ladeindikator angezeigt werden
    return <div className="loader"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<PortfolioMe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />

        {/* admin routess */}
        <Route
          path="/admin-login"
          element={
            project_user ? (
              project_user.role === "admin" ? (
                <Projects />
              ) : (
                <Login />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            project_user && project_user.role === "admin" ? (
              <Projects />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
