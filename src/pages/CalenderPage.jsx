import MyCalendar from "../components/Calender";
import MobileDayView from "../components/MobileViewcalendar";

const CalenderPage = () => {
  return (
    <div>
      <div className="hidden md:block">
        <MyCalendar />
      </div>
      <MobileDayView />
    </div>
  );
};

export default CalenderPage;
