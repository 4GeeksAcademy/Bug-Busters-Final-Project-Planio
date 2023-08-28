import React from 'react';
import { DayPicker } from 'react-day-picker';
import "../../../styles/calendar.css";
// import 'react-day-picker/dist/style.css';

export const CalendarWidget = () => {

  return (
    <div className="day-picker-container d-flex justify-content-center">
      <DayPicker mode="single" />
    </div>
  );
}





