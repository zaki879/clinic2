import React, { useState, useEffect } from 'react';

const Eaze = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const data = [
      {
        "shiftStartTime": "04:30",
        "shiftEndTime": "07:59",
        "employee": "66269961567373a4e8445735",
        "date": "2024-04-28"
      },
      {
        "shiftStartTime": "05:59",
        "shiftEndTime": "07:59",
        "employee": "66269961567373a4e8445734",
        "date": "2024-04-28"
      },
      {
        "shiftStartTime": "04:00",
        "shiftEndTime": "07:59",
        "employee": "66269961567373a4e8245738",
        "date": "2024-04-27"
      },
      {
        "shiftStartTime": "05:59",
        "shiftEndTime": "07:59",
        "employee": "66269961567373a4e8545734",
        "date": "2024-04-27"
      },
      {
        "shiftStartTime": "04:00",
        "shiftEndTime": "07:59",
        "employee": "66269961567373a4e8445448",
        "date": "2024-04-27"
      }
    ]; 
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const filteredEmployees = data.filter(item => item.date === currentDate);
    const employeeIds = filteredEmployees.map(item => item.employee);
    setEmployees(employeeIds);
    console.log(employees);
  }, []);

  return (
    <div>
      <h2>Employees for Today:</h2>
      <ul>
        
      </ul>
    </div>
  );
}

export default Eaze;
