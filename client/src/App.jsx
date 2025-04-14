import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import DeviceList from "./components/DeviceList";
import { DeviceCreate } from "./components/DeviceCreate";
import { DeviceUpdate } from "./components/DeviceUpdate";
import Sidebar from "./components/Sidebar";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const showNavigation = location.pathname === "/devices";

  return (
    <div className="flex w-full h-screen bg-neutral-200 dark:bg-neutral-800">
      <Sidebar resetSearch={() => setSearchTerm("")} />

      <div className="flex flex-col flex-1 ml-20 overflow-hidden">
        {showNavigation && (
          <NavigationBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        <main
          className={`flex flex-1 justify-center items-center overflow-auto ${
            showNavigation ? "mt-20" : ""
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<DeviceList searchTerm={searchTerm} />} />
            <Route path="/deviceCreate" element={<DeviceCreate />} />
            <Route path="/deviceUpdate/:id" element={<DeviceUpdate />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
