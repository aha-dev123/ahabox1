import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import SubscriberDashboard from "./components/SubscriberDashboard";
import routes from "tempo-routes";

function App() {
  // In a real app, this would come from an auth context or API
  const [userRole, setUserRole] = useState<string | null>(null);

  // For demo purposes - toggle between visitor and subscriber
  const toggleUserRole = () => {
    setUserRole(userRole === "subscriber" ? null : "subscriber");
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
            {userRole === "subscriber"
              ? "Switch to Visitor View"
              : "Switch to Subscriber View"}
          </button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              userRole === "subscriber" ? (
                <Navigate to="/dashboard" />
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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
