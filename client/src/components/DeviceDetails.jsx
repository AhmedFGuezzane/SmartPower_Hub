import { useNavigate } from "react-router-dom";
import { FiTrash, FiEdit } from "react-icons/fi";

export default function DeviceDetails({ device, handleDelete }) {
  const navigate = useNavigate();

  if (!device) return <p>No device selected.</p>;

  const {
    name,
    brand,
    type,
    category,
    description,
    averageConsumption = {},
    standbyConsumption,
    powerRating = {}
  } = device;

  return (
    <div className="relative space-y-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow transition">

      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => handleDelete(device.id)}
          className="h-10 w-10 bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-50 hover:bg-red-500 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear flex items-center justify-center"
          title="Delete"
        >
          <FiTrash size={18} />
        </button>
        <button
          onClick={() => navigate(`/deviceUpdate/${device.id}`)}
          className="h-10 w-10 bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-50 hover:bg-blue-400 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear flex items-center justify-center"
          title="Update"
        >
          <FiEdit size={18} />
        </button>
      </div>

      {/* Name and brand */}
      <div>
        <h2 className="text-3xl font-bold text-blue-400">{name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{brand}</p>
      </div>

      {/* Category and type */}
      <div className="text-sm text-gray-600 dark:text-gray-300 italic">
        {category} · {type}
      </div>

      {/* Description */}
      <p className="text-base mt-2">{description}</p>

      {/* Title + Circles */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-blue-400">Analytic Data</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-items-center mt-10">
          <UsageCircle label="Daily" value={averageConsumption.dailyKWh} unit="kWh" />
          <UsageCircle label="Monthly" value={averageConsumption.monthlyKWh} unit="kWh" />
          <UsageCircle label="Annual" value={averageConsumption.annualKWh} unit="kWh" />
          <UsageCircle label="Standby" value={standbyConsumption} unit="W" />
          <UsageCircle label="Min Power" value={powerRating.minWatts} unit="W" />
          <UsageCircle label="Max Power" value={powerRating.maxWatts} unit="W" />
        </div>
      </div>
    </div>
  );
}

function UsageCircle({ label, value, unit }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-30 w-30 rounded-full text-2xl bg-neutral-200 dark:bg-blue-400 text-blue-400 dark:text-neutral-50 flex items-center justify-center font-semibold shadow-md transform transition duration-300 hover:-translate-y-2">
        {value}
      </div>
      <span className="text-s text-gray-500 dark:text-gray-400 text-center">
        {label} ({unit})
      </span>
    </div>
  );
}