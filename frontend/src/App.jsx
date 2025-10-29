import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRouter  from "./router";

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

      <AppRouter authUser={authUser} /> 

      <Toaster reverseOrder={false}/>
    </div>
  )
}
export default App;