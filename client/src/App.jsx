import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import DeviceList from "./components/Device/DeviceList";
import { DeviceCreate } from "./components/Device/DeviceCreate";
import { DeviceUpdate } from "./components/Device/DeviceUpdate";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex w-full h-screen bg-neutral-200 dark:bg-neutral-800">
      <Sidebar setMessage={setMessage} />

      <div className="flex flex-col flex-1 ml-20 overflow-hidden">

        {/* ✅ Global message */}
        {message && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded-xl shadow-md z-[9999]">
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-4 text-green-700 hover:text-green-900"
            >
              ✕
            </button>
          </div>
        )}

        <main className="flex flex-1 justify-center items-center overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<DeviceList />} />
            <Route path="/deviceCreate" element={<DeviceCreate />} />
            <Route path="/deviceUpdate/:id" element={<DeviceUpdate />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default AppWrapper;
