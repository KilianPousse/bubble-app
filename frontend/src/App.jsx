import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import PageLoader from "./components/PageLoader";

function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  if(isCheckingAuth) return <PageLoader/>;

  return (
    <div className="min-h-screen bg-slate-900 relative items-center flex
     justify-center overflow-hidden">

      <Routes>
        <Route path="/" element={authUser ? <ChatPage/> : <Navigate to={"/login"}/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
        <Route path="/settings/" element={authUser ? <SettingsPage/> : <Navigate to={"/login"}/>}/>
      </Routes>

      <Toaster reverseOrder={false}/>
    </div>
  )
}
export default App;