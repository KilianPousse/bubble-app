import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, isLoadingIn, login } = useAuthStore();
  
  console.log("Auth User:", authUser);
  console.log("Is Loading:", isLoadingIn);
  
  return (
    <div className="min-h-screen bg-slate-900 relative items-center flex
     justify-center p-4 overflow-hidden">

      <button onClick={login}>login</button>

      <Routes>
        <Route path="/" element={<ChatPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </div>
  )
}
export default App;