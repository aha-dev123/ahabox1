import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import SubscriberDashboard from "./components/SubscriberDashboard";
import TechSupportAdminDashboard from "./components/TechSupportAdminDashboard";
import TechSupportAgentDashboard from "./components/TechSupportAgentDashboard";
import routes from "tempo-routes";

function App() {
  // In a real app, this would come from an auth context or API
  const [userRole, setUserRole] = useState<string | null>(null);

  // For demo purposes - toggle between different roles
  const toggleUserRole = () => {
    if (userRole === null) {
      setUserRole("subscriber");
    } else if (userRole === "subscriber") {
      setUserRole("tech_support_admin");
    } else if (userRole === "tech_support_admin") {
      setUserRole("tech_support_agent");
    } else {
      setUserRole(null);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Demo toggle button - would be replaced by actual auth in real app */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleUserRole}
            className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm"
          >
            {userRole === null
              ? "Switch to Subscriber View"
              : userRole === "subscriber"
                ? "Switch to Tech Support Admin View"
                : userRole === "tech_support_admin"
                  ? "Switch to Tech Support Agent View"
                  : "Switch to Visitor View"}
          </button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              userRole === "subscriber" ? (
                <Navigate to="/dashboard" />
              ) : userRole === "tech_support_admin" ? (
                <Navigate to="/admin" />
              ) : userRole === "tech_support_agent" ? (
                <Navigate to="/agent" />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              userRole === "subscriber" ? (
                <SubscriberDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              userRole === "tech_support_admin" ? (
                <TechSupportAdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/agent"
            element={
              userRole === "tech_support_agent" ? (
                <TechSupportAgentDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
