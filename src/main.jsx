import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.provider.jsx";
import { CalendarProvider } from "./context/calendar.provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </AuthProvider>
  </StrictMode>
);
