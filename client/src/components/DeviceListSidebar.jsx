// src/components/DeviceListSidebar.jsx
import React from "react";

export default function DeviceListSidebar({ devices, selectedDevice, setSelectedDevice }) {
  return (
    <div className="relative w-1/4 h-full p-4 ">
      <div className="h-full overflow-y-auto no-scrollbar scrollbar-hide">

        <ul className="space-y-4">
          {devices.map((device) => (
            <li
              key={device._id}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-200 ${
                selectedDevice && selectedDevice._id === device._id
                  ? "bg-blue-400 text-white"
                  : "bg-neutral-50 dark:bg-neutral-700 text-blue-400 dark:text-blue-400 hover:bg-blue-400 hover:text-white transition duration-200"
              }`}
              onClick={() => setSelectedDevice(device)}
            >
              <h3 className="text-lg font-bold">{device.name}</h3>
              <p className="text-sm">{device.brand}</p>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}
