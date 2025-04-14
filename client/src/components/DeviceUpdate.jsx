import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export function DeviceUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/devices/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error("Error fetching device:", err));
  }, [id]);

  const baseInputClasses =
    "h-12 w-full px-3 text-neutral-700 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-50 rounded-3xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white transition duration-200 ease-linear";

  const updateFormValue = (key, value) => setForm({ ...form, [key]: value });

  if (!form)
    return <p className="text-gray-600 dark:text-gray-300">Loading device...</p>;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/api/devices/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        navigate("/devices", {
          state: {
            selectedId: id,
            message: "✅ Device successfully updated!",
          },
        });
      }}
      className="bg-white dark:bg-neutral-600 w-1/2 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        value={form.name || ""}
        readOnly
        className={`${baseInputClasses} cursor-not-allowed opacity-70`}
      />
      <input
        type="text"
        value={form.brand || ""}
        readOnly
        className={`${baseInputClasses} cursor-not-allowed opacity-70`}
      />

      <input
        type="text"
        value={form.type || ""}
        onChange={(e) => updateFormValue("type", e.target.value)}
        className={baseInputClasses}
        placeholder="Type"
      />
      <input
        type="text"
        value={form.category || ""}
        onChange={(e) => updateFormValue("category", e.target.value)}
        className={baseInputClasses}
        placeholder="Category"
      />

      <div className="relative col-span-1">
        <select
          value={form.energyLabel || ""}
          onChange={(e) => updateFormValue("energyLabel", e.target.value)}
          className={`${baseInputClasses} appearance-none pr-10`}
        >
          <option value="">Select Energy Label</option>
          {["A++", "A+", "A", "B", "C", "D", "E", "F", "G"].map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-gray-300">
          <FiChevronDown size={18} />
        </div>
      </div>

      <textarea
        value={form.description || ""}
        onChange={(e) => updateFormValue("description", e.target.value)}
        placeholder="Description"
        className={`${baseInputClasses} h-24 col-span-2 resize-none`}
      />

      {["dailyKWh", "monthlyKWh", "annualKWh"].map((key) => (
        <input
          key={key}
          type="number"
          step="any"
          value={form.averageConsumption?.[key] || 0}
          onChange={(e) =>
            setForm({
              ...form,
              averageConsumption: {
                ...form.averageConsumption,
                [key]: parseFloat(e.target.value),
              },
            })
          }
          placeholder={`${key.replace("KWh", "")} kWh`}
          className={baseInputClasses}
        />
      ))}

      {["minWatts", "maxWatts"].map((key) => (
        <input
          key={key}
          type="number"
          step="any"
          value={form.powerRating?.[key] || 0}
          onChange={(e) =>
            setForm({
              ...form,
              powerRating: {
                ...form.powerRating,
                [key]: parseFloat(e.target.value),
              },
            })
          }
          placeholder={key === "minWatts" ? "Min Watts" : "Max Watts"}
          className={baseInputClasses}
        />
      ))}

      <input
        type="number"
        step="any"
        value={form.standbyConsumption || 0}
        onChange={(e) =>
          updateFormValue("standbyConsumption", parseFloat(e.target.value))
        }
        placeholder="Standby Consumption"
        className={baseInputClasses}
      />

      {/* ✅ Buttons: Update + Cancel */}
      <div className="col-span-2 flex justify-between gap-4 mt-2">
        <button
          type="submit"
          className="h-12 w-1/2 bg-neutral-600 dark:bg-neutral-200 hover:bg-blue-400 text-white dark:text-neutral-800 px-4 rounded-3xl transition duration-200 ease-linear"
        >
          Update Device
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/devices", {
              state: {
                selectedId: id,
                message: "⚠️ Changes were cancelled.",
              },
            })
          }
          className="h-12 w-1/2 bg-gray-300 dark:bg-gray-600 hover:bg-red-500 hover:text-white text-gray-900 dark:text-white px-4 rounded-3xl transition duration-200 ease-linear"
        >
          Cancel Changes
        </button>
      </div>
    </form>
  );
}
