import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRouter  from "./router";

import PageLoader from "./components/PageLoader";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  console.log("Auth User:", authUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <PageLoader/>;

  return (
    <div className="min-h-screen bg-slate-900 relative items-center flex
     justify-center overflow-hidden">

      <AppRouter authUser={authUser} /> 

      <Toaster 
        position="top-right" 
        gutter={4} 
        toastOptions={{ 
          duration: 4000, 
          style: {
            background: '#0ea5e9',
            color: '#fff',
          },
          error: {
            style: {
              background: 'rgba(218, 20, 20, 1)',
            },
            iconTheme: {
              primary: "rgba(218, 20, 20, 1)",
              secondary: "#fff",
            }
          }
        }} 
      />
    </div>
  )
}
export default App;