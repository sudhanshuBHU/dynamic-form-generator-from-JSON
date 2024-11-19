import { useEffect, useState } from "react";
import "./App.css";
import Landing from "./components/Landing";

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const dark_local = localStorage.getItem("dark");
    if (dark_local === "true") {
      setDark(true);
      localStorage.setItem("dark", "true");
    } else {
      setDark(false);
      localStorage.setItem("dark", "false");
    }
  }, []);
  useEffect(() => {
    if (dark === true) {
      localStorage.setItem("dark", "true");
    } else {
      localStorage.setItem("dark", "false");
    }
  }, [dark]);
  return (
    <div className={`${dark && "dark"}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-neutral-700">
        <div className="container mx-auto py-2">
          <Landing dark={dark} setDark={setDark} />
        </div>
      </div>
    </div>
  );
}

export default App;
