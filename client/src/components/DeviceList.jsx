import { useEffect, useState } from "react";
import DeviceDetails from "./DeviceDetails";
import DeviceListSidebar from "./DeviceListSidebar";
import { useLocation } from "react-router-dom";

export default function DeviceList({ searchTerm }) {
  const location = useLocation();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [message, setMessage] = useState(location.state?.message || "");

  // ✅ NEW: store selectedId in its own state (one-time from location)
  const [selectedId, setSelectedId] = useState(location.state?.selectedId || null);

  // ✅ Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/devices");
        const data = await res.json();
        setDevices(data.devices);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    };

    fetchDevices();
  }, []);

  // ✅ Sync selected device based on `selectedId`
  useEffect(() => {
    if (devices.length > 0 && selectedId) {
      const match = devices.find((d) => String(d.id) === String(selectedId));
      setSelectedDevice(match || devices[0]);
    }
  }, [devices, selectedId]);

  // ✅ Dismiss message after 4s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/devices/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        const updatedRes = await fetch("http://localhost:3000/api/devices");
        const data = await updatedRes.json();
  
        setDevices(data.devices);
        setMessage("🗑️ Device successfully deleted.");
  
        if (data.devices.length > 0) {
          setSelectedDevice(data.devices[0]);
        } else {
          setSelectedDevice(null);
        }
      } else {
        const error = await res.json();
        console.error("Delete error:", error);
        setMessage("❌ Failed to delete device.");
      }
    } catch (err) {
      console.error("Error deleting device:", err);
      setMessage("❌ Error deleting device.");
    }
  };
  const filteredDevices = devices.filter((d) =>
    `${d.name} ${d.brand} ${d.type}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-full">
      <DeviceListSidebar
        devices={filteredDevices}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />

      <div className="w-full m-3.5 bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg transition-colors duration-200">
      {message && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 bg-green-100 border border-green-300 text-green-800 rounded-xl shadow-lg text-center w-1/3 max-w-[90vw]">
          {message}
          <button
            onClick={() => setMessage("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-900">
            ✕
          </button>
        </div>
      )}

        {selectedDevice ? (
          <DeviceDetails
            device={selectedDevice}
            handleDelete={handleDelete}
          />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Please select a device to view details.
          </p>
        )}
      </div>
    </div>
  );
}
