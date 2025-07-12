import DarkModeToggle from "./DarkToggle";

const CalendarToolbar = ({
  doctors,
  patients,
  selectedDoctor,
  selectedPatient,
  onFilterChange,
  label
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-4 dark:bg-[#1f2937]">
      <div className="flex gap-4">
        {/* Doctor Filter */}
        <select
          value={selectedDoctor}
          onChange={(e) => onFilterChange("doctor", e.target.value)}
          className="border p-2 rounded dark:bg-[#1f2937] ">
          <option value="" className="dark:bg-[#1f2937]">All Doctors</option>
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
          className="border p-2 rounded dark:bg-[#1f2937]">
          <option className="dark:bg-[#1f2937]" value="">All Patients</option>
          {patients.map((pat) => (
            <option key={pat} value={pat}>
              {pat}
            </option>
          ))}
        </select>
      </div>
       <DarkModeToggle/>
    </div>
  );
};

export default CalendarToolbar;
