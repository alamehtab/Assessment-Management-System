import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { ToastContainer } from "react-toastify";

function App() {
  const PrivateRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
