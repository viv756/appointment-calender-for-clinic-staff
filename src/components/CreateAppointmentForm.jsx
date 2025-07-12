import { useState } from "react";
import { useCalendarContext } from "../context/calendar.provider";

const CreateAppointmentForm = ({ selectedDate, setIsModalOpen }) => {
  const [formData, setFormData] = useState({});

  const { addAppointment, setShowform } = useCalendarContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { doctorName, patientName, time } = formData;

    const start = new Date(`${selectedDate.toDateString()} ${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration

    addAppointment({
      id: Date.now(),
      title: `${patientName} ${time}`,
      doctorName,
      patientName,
      start,
      end,
    });

    setIsModalOpen(false);
    setShowform(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col text-left">
        <label htmlFor="doctorName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Doctor Name
        </label>
        <select
          onChange={handleInputChange}
          name="doctorName"
          id="doctorName"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1f2937] dark:text-white ">
          <option value="" className="dark:text-white">Select a doctor</option>
          <option value="Dr. John Smith" className="dark:text-white">Dr. John Smith</option>
          <option value="Dr. Alice Williams" className="dark:text-white">Dr. Alice Williams</option>
          <option value="Dr. David Lee" className="dark:text-white">Dr. David Lee</option>
          <option value="Dr. Sophia Patel" className="dark:text-white">Dr. Sophia Patel</option>
        </select>
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="doctorName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white ">
          Patient Name
        </label>
        <select
          onChange={handleInputChange}
          name="patientName"
          id="patientName"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1f2937] dark:text-white ">
          <option value="">Select a Patient</option>
          <option value="John Doe">John Doe</option>
          <option value="Emily Johnson">Emily Johnson</option>
          <option value="Michael Brown">Michael Brown</option>
          <option value="Sarah Davis">Sarah Davis</option>
          <option value="Daniel Wilson">Daniel Wilson</option>
          <option value="Olivia Martinez">Olivia Martinez</option>
        </select>
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="time" className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Appointment Time
        </label>
        <input
          onChange={handleInputChange}
          type="time"
          name="time"
          id="time"
          required
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white  "
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 font-semibold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ">
        Create
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
