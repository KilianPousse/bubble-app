import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsLayout from "./pages/SettingsLayout";

import GeneralSettings from "./components/settings/GeneralSettings";
import UserSettings from "./components/settings/UserSettings";
import SecuritySettings from "./components/settings/SecuritySettings";
import NotificationsSettings from "./components/settings/NotificationsSettings";

function AppRouter({ authUser = null }) {
  return (
    <Routes>
      <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

      {/* Settings Layout with nested routes */}
      <Route path="/settings" element={authUser ? <SettingsLayout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="general" />} />
        <Route path="general" element={<GeneralSettings />} />
        <Route path="user" element={<UserSettings />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="notifications" element={<NotificationsSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
