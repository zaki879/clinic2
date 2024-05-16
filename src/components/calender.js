import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

const HorizontalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);

  const nextMonth = () => {
    setCurrentDate((prevDate) => prevDate.clone().add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => prevDate.clone().subtract(1, "month"));
  };

  const scrollToCurrentDay = () => {
    const currentDay = moment().date();
    const dayElement = document.querySelector(`.day-number-${currentDay}`);
    
    if (dayElement) {
      const screenWidth = window.innerWidth;
      const dayOffsetLeft = dayElement.offsetLeft;
      const dayWidth = dayElement.offsetWidth;
      
      // Calculate the scroll position to center the current day based on screen width
      const scrollLeft = dayOffsetLeft*dayElement.offsetWidth;
      window.scrollTo({
        left: scrollLeft,
        behavior: 'smooth' // Optional: Scroll with smooth animation
      });
    }
  };
  

  useEffect(() => {
    scrollToCurrentDay();
  }, [currentDate]);
  

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const scrollSpeed = 1; // Adjust scroll speed as needed
    const delta = event.clientX - startX;
    container.scrollLeft -= delta * scrollSpeed;
    setStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (isDragging) return;
    scrollToCurrentDay();
  };

  const daysInMonth = () => {
    const days = [];
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");

    // Add days from the 16th of previous month to end of current month
    const currentDay = startOfMonth.clone().subtract(28, "days");

    while (currentDay.isBefore(endOfMonth, "day")) {
      days.push(currentDay.add(1, "day").clone());
    }

    return days;
  };

  const dayNames = moment.weekdaysShort(); // Get short names of days

  return (
    <div className="horizontal-calendar">
      
     
      <div
        className="day-numbers-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        <div className="day-numbers">
          {daysInMonth().map((day, index) => (
            <div
              key={index}
              className={`day-number day-number-${day.date()} ${
                day.month() === moment().month() ? "current-month" : ""
              } ${
                day.date() === moment().date() &&
                day.month() === moment().month()
                  ? "current-day"
                  : ""
              }`}
              style={{ userSelect: "none" }}
            >
<div className="daynametxt" style={{ color: (day.format("ddd")  === moment().format("ddd"))&&(day.format("DD") === moment().format("DD")) ? '#6d00fc' : '#c3c7cd' }}>
  {day.format("ddd")}
</div>

              <div style={{paddingBottom:'4px',paddingLeft:day.format("DD") === moment().format("DD") ?'2px':"0px",marginLeft:'6px'}}>{day.format("DD")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCalendar;
