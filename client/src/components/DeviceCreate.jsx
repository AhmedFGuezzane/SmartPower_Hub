import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function DeviceCreate() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    type: "",
    category: "",
    description: "",
    averageConsumption: {
      dailyKWh: 0,
      monthlyKWh: 0,
      annualKWh: 0,
      unit: "kWh"
    },
    powerRating: {
      minWatts: 0,
      maxWatts: 0
    },
    energyLabel: "",
    standbyConsumption: 0
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ici on accede a la methode Post de la route devices/
      const response = await fetch("http://localhost:3000/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // Si cest bien cree, on retourne a la liste de device avec le nouveau device comme etant le device selectionne 
      // On envoi egalement un message de succes
      if (response.ok) {
        const created = await response.json();
        navigate("/devices", {
          state: {
            selectedId: created.id,
            message: "✅ Device successfully created!"
          }
        });
      } else {

      // Si cest pas cree, on retourne a la liste de device
      // On envoi egalement un message d'erreur
        const error = await response.json();
        navigate("/devices", {
          state: {
            message: `❌ Error creating device: ${error.message || "Unknown error"}`
          }
        });
      }
    } catch (error) {
      navigate("/devices", {
        state: {
          message: `❌ Network error: ${error.message}`
        }
      });
    }
  };

  const baseInputClasses =
    "h-12 w-full px-3 text-neutral-700 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-50 rounded-3xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white transition duration-200 ease-linear";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-neutral-800 w-1/2 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow grid grid-cols-2 gap-4"
    >
      <input type="text" placeholder="Name" className={baseInputClasses} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="text" placeholder="Brand" className={baseInputClasses} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
      <input type="text" placeholder="Type" className={baseInputClasses} onChange={(e) => setForm({ ...form, type: e.target.value })} />
      <input type="text" placeholder="Category" className={baseInputClasses} onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <div className="relative col-span-1">
        <select className={`${baseInputClasses} appearance-none pr-10`} onChange={(e) => setForm({ ...form, energyLabel: e.target.value })} defaultValue="">
          <option value="">Select Energy Label</option>
          {["A++", "A+", "A", "B", "C", "D", "E", "F", "G"].map((label) => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-gray-300">
          <FiChevronDown size={18} />
        </div>
      </div>

      <textarea placeholder="Description" className={`${baseInputClasses} h-24 col-span-2 resize-none`} onChange={(e) => setForm({ ...form, description: e.target.value })} />

      {["dailyKWh", "monthlyKWh", "annualKWh"].map((key) => (
        <input
          key={key}
          type="number"
          step="any"
          placeholder={`${key.replace("KWh", "")} kWh`}
          className={baseInputClasses}
          onChange={(e) => setForm({ ...form, averageConsumption: { ...form.averageConsumption, [key]: parseFloat(e.target.value) } })}
        />
      ))}

      {["minWatts", "maxWatts"].map((key) => (
        <input
          key={key}
          type="number"
          step="any"
          placeholder={key === "minWatts" ? "Min Watts" : "Max Watts"}
          className={baseInputClasses}
          onChange={(e) => setForm({ ...form, powerRating: { ...form.powerRating, [key]: parseFloat(e.target.value) } })}
        />
      ))}

      <input
        type="number"
        step="any"
        placeholder="Standby Consumption"
        className={baseInputClasses}
        onChange={(e) => setForm({ ...form, standbyConsumption: parseFloat(e.target.value) })}
      />

      {/* ✅ Submit + Cancel */}
      <div className="col-span-2 flex justify-between gap-4 mt-2">
        <button
          type="submit"
          className="h-12 w-1/2 bg-neutral-600 hover:bg-blue-400 text-white px-4 rounded-3xl transition duration-200 ease-linear"
        >
          Create Device
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/devices", {
              state: {
                message: "⚠️ Device creation cancelled.",
              },
            })
          }
          className="h-12 w-1/2 bg-gray-300 dark:bg-gray-600 hover:bg-red-500 hover:text-white text-gray-900 dark:text-white px-4 rounded-3xl transition duration-200 ease-linear"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
