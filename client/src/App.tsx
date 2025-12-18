import { useEffect, useState } from "react";
import { api } from "./services/api";

function App() {
  const [status, setStatus] = useState<string>("Checking server...");

  useEffect(() => {
    api.healthCheck()
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend not reachable ❌");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <h1 className="text-xl font-semibold">
        {status}
      </h1>
    </div>
  );
}

export default App;
