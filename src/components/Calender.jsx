import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./Modal";
import { useCalendarContext } from "../context/calendar.provider";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({});

  const { appointments, addAppointment } = useCalendarContext();

  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

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
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "800px" }}
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        components={{
          toolbar: () => null,
        }}
        onSelectSlot={handleSlotSelect}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add Appointment – ${selectedDate?.toDateString()}`}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col text-left">
            <label htmlFor="doctorName" className="block mb-1 text-sm font-medium text-gray-700 ">
              Doctor Name
            </label>
            <select
              onChange={handleInputChange}
              name="doctorName"
              id="doctorName"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  ">
              <option value="">Select a doctor</option>
              <option value="Dr. John Smith">Dr. John Smith</option>
              <option value="Dr. Alice Williams">Dr. Alice Williams</option>
              <option value="Dr. David Lee">Dr. David Lee</option>
              <option value="Dr. Sophia Patel">Dr. Sophia Patel</option>
            </select>
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="doctorName" className="block mb-1 text-sm font-medium text-gray-700 ">
              Patient Name
            </label>
            <select
              onChange={handleInputChange}
              name="patientName"
              id="patientName"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  ">
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
            <label htmlFor="time" className="mb-1 text-sm font-medium text-gray-700 ">
              Appointment Time
            </label>
            <input
              onChange={handleInputChange}
              type="time"
              name="time"
              id="time"
              required
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  "
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 font-semibold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ">
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MyCalendar;
