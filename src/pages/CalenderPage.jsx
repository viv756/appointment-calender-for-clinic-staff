import MyCalendar from "../components/Calender";
import MobileDayView from "../components/MobileViewcalendar";

const CalenderPage = () => {
  return (
    <div>
      <div className="hidden md:block dark:bg-[#1f2937]">
        <MyCalendar />
      </div>
      <MobileDayView />
    </div>
  );
};

export default CalenderPage;
