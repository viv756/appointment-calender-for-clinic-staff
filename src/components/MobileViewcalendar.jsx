import { useState, useEffect, useMemo } from "react";
import { useCalendarContext } from "../context/calendar.provider";
import moment from "moment";

const MobileDayView = () => {
  const { appointments } = useCalendarContext();

  const [selectedDate, setSelectedDate] = useState(() => moment().startOf("day").toDate());

  // List of upcoming days in current month
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = moment().startOf("month");
    const end = moment().endOf("month");
    const daysList = [];

    while (start <= end) {
      daysList.push(start.clone().toDate());
      start.add(1, "day");
    }

    setDays(daysList);
  }, []);

  const getAppointmentsForDay = (day) => {
    return appointments.filter((appt) => moment(appt.start).isSame(day, "day"));
  };

  return (
    <div className="md:hidden p-4 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <input
          type="date"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={(e) => setSelectedDate(moment(e.target.value).toDate())}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[75vh] pb-8">
        {days
          .filter((day) => day >= selectedDate)
          .map((day) => {
            const appts = getAppointmentsForDay(day);
            return (
              <div key={day.toISOString()} className="bg-white rounded shadow p-4">
                <h3 className="font-semibold text-blue-700 mb-2">
                  {moment(day).format("dddd, MMMM D")}
                </h3>

                {appts.length > 0 ? (
                  <ul className="space-y-2">
                    {appts.map((appt) => (
                      <li
                        onClick={handleSlotSelect}
                        key={appt.id}
                        className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <div className="font-medium text-blue-900">{appt.patientName}</div>
                        <div className="text-sm text-gray-700">{appt.doctorName}</div>
                        <div className="text-sm text-gray-500">
                          {moment(appt.start).format("hh:mm A")}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No appointments</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MobileDayView;
