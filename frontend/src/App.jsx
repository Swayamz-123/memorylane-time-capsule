import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AIResultPage from "./pages/ai/AiResultPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import CapsuleViewPage from "./pages/CapsuleViewPage";
import GuestRoute from "./components/GuestRoute";
import ThemeCapsulesPage from "./pages/ThemeCapsule";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
           <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/capsules/new"
            element={
              <ProtectedRoute>
                <CreateCapsule />
              </ProtectedRoute>
            }
          />
           <Route
  path="/themes/:theme"
  element={
    <ProtectedRoute>
      <ThemeCapsulesPage />
    </ProtectedRoute>
  }
/>


          <Route
            path="/capsules/:id"
            element={
              <ProtectedRoute>
                <CapsuleViewPage />
              </ProtectedRoute>
            }
          />
          <Route
  path="/capsules/:id/ai/:type"
  element={<ProtectedRoute><AIResultPage /></ProtectedRoute>}
/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
