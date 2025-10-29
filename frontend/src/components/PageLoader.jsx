import { useEffect, useState } from "react";
import PageTitle from "./TitlePage";
import { LoaderIcon } from "./icons";

function PageLoader() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 h-screen">
      <PageTitle title="Loading..."/>
      <LoaderIcon />
      <br/>
      <p className="w-1/3 text-center text-white">
        Please wait while we load the content for you.
      </p>
    </div>
  );
}
export default PageLoader;
