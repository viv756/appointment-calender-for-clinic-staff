// CalendarToolbar.jsx
import React from "react";

const CalendarToolbar = ({
  doctors,
  patients,
  selectedDoctor,
  selectedPatient,
  onFilterChange,
  label
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-4">
      <div className="flex gap-4">
        {/* Doctor Filter */}
        <select
          value={selectedDoctor}
          onChange={(e) => onFilterChange("doctor", e.target.value)}
          className="border p-2 rounded">
          <option value="">All Doctors</option>
          {doctors.map((doc) => (
            <option key={doc} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        {/* Patient Filter */}
        <select
          value={selectedPatient}
          onChange={(e) => onFilterChange("patient", e.target.value)}
          className="border p-2 rounded">
          <option value="">All Patients</option>
          {patients.map((pat) => (
            <option key={pat} value={pat}>
              {pat}
            </option>
          ))}
        </select>
      </div>
       <h1 className="text-xl md:text-2xl font-bold text-blue-700">
        {label}
      </h1>
    </div>
  );
};

export default CalendarToolbar;
