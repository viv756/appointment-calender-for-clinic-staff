import { useCalendarContext } from "../context/calendar.provider";

const Modal = ({ isOpen, onClose, title, children, dayAppointments }) => {
  const { showForm, setShowform, deleteAppointment } = useCalendarContext();

  if (!isOpen) return null;

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this appointment?");
    if (confirm) {
      deleteAppointment(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-500  text-xl font-bold">
            &times;
          </button>
        </div>
        {!showForm ? (
          <>
            {/* Show appointments for the day */}
            {dayAppointments.length > 0 ? (
              <ul className="space-y-2">
                {dayAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="border p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appt.patientName}</p>
                      <p className="text-sm text-gray-500">{appt.doctorName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(appt.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No appointments on this day.</p>
            )}

            <button
              onClick={() => setShowform(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Add Appointment
            </button>
          </>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
