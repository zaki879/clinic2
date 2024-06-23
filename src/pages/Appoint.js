import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { motion, AnimatePresence } from "framer-motion";
import searchicon from "../assets/searchicon.png";
import filtericon from "../assets/filtericon88.png";
import React, { useState, useEffect, useRef } from "react";
import { MuiPicker } from "../components/MuiPicker";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import doctorimg from "../assets/doctorimg.jpg";
import userprofile from "../assets/17 1.png";
import doctorimg2 from "../assets/billelfellahi.jpg";
import removeicon from "../assets/removeicon.png";
import loadingimage from "../assets/loadingimage1.gif";
import loadingimage1 from "../assets/loadingimage2.gif";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { CircularProgress } from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
const CustomComponent = ({
  endtimeschedule,
  starttimeschedule,
  clickedCellIdString,
  datecell,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [schedule, setschedule] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setrefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setrefreshToken(localStorage.getItem("refreshToken"));
    setaccessToken(localStorage.getItem("accessToken"));
  }, []);

  const deleteScheduleById = (scheduleId) => {
    // Make a DELETE request to your API endpoint to delete the schedule
    axios
      .delete(`https://beep-zlaa.onrender.com/api/schedules/${scheduleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Schedule deleted successfully:", response.data);
        // If needed, update state or perform any other actions
      })
      .catch((error) => {
        console.error("Error deleting schedule:", error);
        // Handle error, set error state, show error message, etc.
      });
  };

  useEffect(() => {
    const refreshTokenf = async () => {
      try {
        const response = await axios.post(
          "https://beep-zlaa.onrender.com/api/auth/refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = response.data;
        setaccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);

        axios
          .get("https://beep-zlaa.onrender.com/api/schedules", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Handle successful response, update state with users data
            const { schedules } = response.data;
            // Set the state with the extracted schedules array
            setschedule(schedules);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            // Handle error, set error state
            setError("Failed to fetch users");
            // If the error is due to unauthorized access, you might want to redirect to the login page
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after request completes
          });
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle token refresh failure, maybe redirect to login page
      }
    };
    refreshTokenf();
  }, []);

  const findScheduleId = () => {
    
    const employeeId = clickedCellIdString;
    const date = datecell;
    const shiftStartTime = starttimeschedule;
    const shiftEndTime = endtimeschedule;

    const filteredSchedule = schedule.filter(
      (item) =>
        item.employee === employeeId &&
        item.date === date &&
        item.shiftStartTime === shiftStartTime &&
        item.shiftEndTime === shiftEndTime
    );

    if (filteredSchedule.length > 0) {
      return filteredSchedule[0]._id;
    } else {
      return "Employee not found with specified conditions.";
    }
  };

  const handleDelete = () => {
    deleteScheduleById(findScheduleId());
    setIsDeleted(true);
  };

  const getColorForTimePeriod = (startTime) => {
    const morningColors = ["#6d00fc"];
    const eveningColors = ["#6d00fc"];
    const nightColors = ["#6d00fc"];

    const hour = new Date(startTime).getHours();

    if (hour >= 6 && hour < 12) {
      return morningColors[Math.floor(Math.random() * morningColors.length)];
    } else if (hour >= 12 && hour < 18) {
      return eveningColors[Math.floor(Math.random() * eveningColors.length)];
    } else {
      return nightColors[Math.floor(Math.random() * nightColors.length)];
    }
  };

  if (isDeleted) {
    return null;
  }

  const timePeriodColor = getColorForTimePeriod(starttimeschedule);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "fit-content",
          alignSelf: "center",
          background: timePeriodColor,
          padding: "10px",
          borderRadius: "15px",
          margin: "10px",
        }}
      >
        <span
          style={{ fontFamily: "outfitmed", fontSize: "12px", color: "#fff" }}
        >
          {starttimeschedule} - {endtimeschedule}
        </span>
      </div>
      <img
        src={removeicon}
        alt="Remove"
        onClick={handleDelete}
        id={
          clickedCellIdString +
          "_" +
          datecell +
          "_" +
          starttimeschedule +
          "_" +
          endtimeschedule
        }
        style={{ cursor: "pointer", height: "20px", width: "14px" }}
      />
    </div>
  );
};

const YourComponent = (props) => {
  const { cellTimeMapsecond, setCellTimeMapsecond } = props;

  const [clickedCellId, setClickedCellId] = useState("");
  const [clickedCellIdString, setClickedCellIdString] = useState("");
  const [extractid, setClickedextractid] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [starttimeschedule, setStarttimeschedule] = useState("");
  const [endtimeschedule, setEndtimeschedule] = useState("");
  const [cellTimeMap, setCellTimeMap] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const popupRef = useRef(null);
  const { selectedchosenSpecialty, searchQuery } = props;
  const [specialties, setSpecialties] = useState([]);
  const [users, setUsers] = useState([]);
  const [schedule, setschedule] = useState([]);

  const [refreshToken, setrefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setrefreshToken(localStorage.getItem("refreshToken"));
    setaccessToken(localStorage.getItem("accessToken"));
  }, []);
  useEffect(() => {
    // Function to refresh the access token
    const refreshTokenf = async () => {
      try {
        const response = await axios.post(
          "https://beep-zlaa.onrender.com/api/auth/refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = response.data;
        setaccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        const positionsResponse = await axios.get(
          "https://beep-zlaa.onrender.com/api/positions",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Handle successful response, update state with positions data
        const specialtiesData = positionsResponse.data; // Access the data directly
        setSpecialties(specialtiesData);
        setIsLoading(false);
        // Now fetch users with the updated access token
        axios
          .get("https://beep-zlaa.onrender.com/api/users", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Handle successful response, update state with users data
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            // Handle error, set error state
            setError("Failed to fetch users");
            // If the error is due to unauthorized access, you might want to redirect to the login page
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after request completes
          });
        axios
          .get("https://beep-zlaa.onrender.com/api/schedules", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Handle successful response, update state with users data
            const { schedules } = response.data;
            // Set the state with the extracted schedules array
            setschedule(schedules);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            // Handle error, set error state
            setError("Failed to fetch users");
            // If the error is due to unauthorized access, you might want to redirect to the login page
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after request completes
          });
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle token refresh failure, maybe redirect to login page
      }
    };

    // Call refreshToken function before fetching users
    refreshTokenf();
  }, []);

  useEffect(() => {
    // Function to count user statuses
    function extractUserSched() {
      for (const employees of users) {
        const filteredShifts = schedule.filter(
          (shift) => shift.employee === employees._id
        );
       
        let subArrays = filteredShifts.map(
          ({ shiftStartTime, shiftEndTime, date, employee }) => ({
            shiftStartTime,
            shiftEndTime,
            date,
            employeeid: employee, // Assigning `employee` to `employeeid`
          })
        );
        
        subArrays = subArrays.filter((v, i, a) => a.findIndex(t => (
          t.employeeid === v.employeeid && 
          t.date === v.date && 
          t.shiftStartTime === v.shiftStartTime && 
          t.shiftEndTime === v.shiftEndTime
        )) === i);
        
        for (const subArray of subArrays) {
          setCellTimeMap((prevState) => ({
            ...prevState,
            [employees._id + "_" + subArray.date]: [
              ...(prevState[employees._id + "_" + subArray.date] || []),
              {
                start: subArray.shiftStartTime,
                end: subArray.shiftEndTime,
                cellid: subArray.employeeid,
                date: subArray.date,
              },
            ],
          }));
        }
      }
    }
    extractUserSched();
  }, [schedule]);

  const findItemById = (id) => {
    const itemId = id;
    const foundItem = specialties.find((item) => item._id === itemId);
    if (foundItem) {
      // Return just the value of the key 'positionName'
      return foundItem.positionName.toString();
    } else {
      return "Item not found";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCellClick = (event) => {
    const clickedElement = event.target;
    setError(""); // Update state directly, no need for `this`
    if (clickedElement.tagName.toLowerCase() === "div") {
      const cell = clickedElement.closest("td");

      if (cell) {
        const clickedCellId = cell.id;
        const clickedCellIdString = `${clickedCellId}`;
        setClickedCellId(clickedCellId);
        setClickedCellIdString(clickedCellIdString);
        const str = clickedCellIdString;
        const id = str.split("_")[0];
        setClickedextractid(id);
        setShowPopup(true);
      } else {
        console.error("Parent cell not found.");
      }
    }
  };

  const renderPopup = () => {
    const handlestartTimeChangeschedule = (event) => {
      setStarttimeschedule(event.target.value);
    };

    const handleendTimeChangeschedule = (event) => {
      setEndtimeschedule(event.target.value);
    };

    const saveresult = () => {
      // Check if start time or end time is null or an empty string
      if (
        !starttimeschedule ||
        !endtimeschedule ||
        starttimeschedule === endtimeschedule
      ) {
        // Update state to hold error information
        setError("Invalid time period");
        return;
      }
      const str = clickedCellIdString;
      const date = str.split("_")[1]; // Splitting the string by "_" and getting the second part
      // Update cellTimeMap by pushing the new time period into the array for the clicked cell
      setCellTimeMap((prevState) => ({
        ...prevState,
        [clickedCellIdString]: [
          ...(prevState[clickedCellIdString] || []),
          {
            start: starttimeschedule,
            end: endtimeschedule,
            cellid: extractid,
            date: date,
          },
        ],
      }));
      setCellTimeMapsecond((prevState) => ({
        ...prevState,
        [clickedCellIdString]: [
          ...(prevState[clickedCellIdString] || []),
          {
            shiftStartTime: starttimeschedule,
            shiftEndTime: endtimeschedule,
            employee: extractid,
            date: date,
          },
        ],
      }));
      setShowPopup(false); // Close popup after saving
      setError(null);
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        style={{
          position: "absolute",
          left: "24%",
          zIndex: "2",
          top: "413px",
          height: "fit-content",
          width: "100%",
          marginLeft: "80px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignSelf: "center",
          background: "transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={popupRef} // Assign the ref to the pop-up container
          className="absolute-container"
          style={{
            width: "170px",
            height: "fit-content",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0,255, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            style={{ fontFamily: "outfit", fontSize: "12px", padding: "10px" }}
          >
            Start Time
          </span>
          <motion.div
            initial={{ x: -10, opacity: 0.4 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "row",
              height: "45px",
              width: "100%",
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: "22px",

              boxShadow: "0px 0px 60px #828efc34",
            }}
          >
            <input
              style={{
                fontFamily: "outfitlight",
                fontSize: "14px",
                color: "#c4c4c4",
                alignSelf: "center",
                marginLeft: "20px",
                marginRight: "5px",
                border: "0px solid white",
                width: "80%",
                outline: "none",
              }}
              type="time"
              value={starttimeschedule}
              onChange={handlestartTimeChangeschedule}
            />
          </motion.div>
          <div style={{ height: "10px" }}></div>
          <span
            style={{ fontFamily: "outfit", fontSize: "12px", padding: "10px" }}
          >
            End Time
          </span>
          <motion.div
            initial={{ x: -10, opacity: 0.4 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "row",
              height: "45px",
              width: "100%",
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: "22px",

              boxShadow: "0px 0px 60px #828efc34",
            }}
          >
            <input
              style={{
                fontFamily: "outfitlight",
                fontSize: "14px",
                color: "#c4c4c4",
                alignSelf: "center",
                marginLeft: "20px",
                marginRight: "5px",
                border: "0px solid white",
                width: "80%",
                outline: "none",
              }}
              type="time"
              value={endtimeschedule}
              onChange={handleendTimeChangeschedule}
            />
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="add-patient-button1"
            onClick={saveresult}
            style={{
              alignSelf: "center",
              height: "40px",
              marginTop: "20px",
              position: "relative",
              borderRadius: "50px",
              width: "fit-content",
            }}
          >
            {" "}
            {/* Motion div for "Register Doctor" text */}
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="txt-button"
            >
              Save
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const { startDate, endDate } = props;

  const renderHeaders = () => {
    const headers = [];
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const month = date
          .toLocaleString("en-US", { month: "short" })
          .toUpperCase();
        const day = date.getDate();
        const dayOfWeek = date
          .toLocaleString("en-US", { weekday: "short" })
          .toUpperCase();

        headers.push(
          <th className="month-header" key={date.toISOString()}>
            {`${month} ${day} (${dayOfWeek})`}
          </th>
        );
      }
    }
    return headers;
  };

  const renderCells = () => {
    const cells = [];
    const { startDate, endDate } = props;

    if (startDate && endDate) {
      for (const employee of users) {
        const employeeCells = [];
        for (
          let date = new Date(startDate);
          date <= new Date(endDate);
          date.setDate(date.getDate() + 1)
        ) {
          const cellId = `${employee._id}_${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

          const timePeriods = cellTimeMap[cellId] || [];
          employeeCells.push(
            <td
              className="specialcontainer3"
              key={cellId}
              id={cellId}
              onClick={handleCellClick}
            >
              <div
                onClick={handleCellClick}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {timePeriods.map((timePeriod, index) => (
                  <CustomComponent
                    clickedCellIdString={timePeriod.cellid}
                    datecell={timePeriod.date}
                    key={index}
                    starttimeschedule={timePeriod.start}
                    endtimeschedule={timePeriod.end}
                  />
                ))}
                <div
                  className="customdivhr"
                  style={{
                    height: "37px",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></div>
              </div>
            </td>
          );
        }
        if (
          (selectedchosenSpecialty === "" ||
            findItemById(employee.positionID) === selectedchosenSpecialty) &&
          (searchQuery === "" ||
            employee.firstName.toLowerCase().includes(searchQuery))
        ) {
          cells.push(
            <tr key={employee._id}>
              <td className="specialcontainer">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                    src={doctorimg} // assuming each employee has an img property
                    alt="doctor"
                  />
                  <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    {employee.firstName} {employee.lastName}
                  </span>
                </div>
              </td>
              <td className="specialcontainer2"></td>
              <td className="specialcontainer1">
                {findItemById(employee.positionID)}
              </td>

              {employeeCells}
            </tr>
          );
        }
      }
    }
    return cells;
  };

  return (
    <div>
      {error && showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: "absolute",
            left: "24%",
            zIndex: "2000000000",
            top: "690px",
            height: "fit-content",
            width: "100%",
            marginLeft: "80px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignSelf: "center",
            background: "transparent",
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={popupRef} // Assign the ref to the pop-up container
            className="absolute-container"
            style={{
              width: "170px",
              height: "fit-content",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0,255, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                fontFamily: "outfit",
                fontSize: "12px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </span>
          </div>
        </motion.div>
      )}
      <div>
        <table>
          <thead
            style={{
              position: "sticky",
              top: "0",
              zIndex: "1",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 255, 0.07)",
              height: "40px",
            }}
          >
            <tr>
              <th colSpan="3">
                <span className="specialheader">Doctors</span>
                <span className="specialheader"></span>
                <span
                  style={{
                    color: "#1f1f1f",
                  }}
                >
                  &
                </span>
                <span className="specialheader1">SPECIALITY(S)</span>
              </th>
              {/* Assuming renderHeaders() function generates additional header cells */}
              {renderHeaders()}
            </tr>
          </thead>
          <tbody>{renderCells()}</tbody>
        </table>
        <AnimatePresence>{showPopup && renderPopup()}</AnimatePresence>
      </div>
     
    </div>
  );
};

const Schedule = () => {
  const [cellTimeMapsecond, setCellTimeMapsecond] = useState([]);

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const today = new Date();
  const [specialties, setSpecialties] = useState([]);
  const [extractedData, setextractedData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [schedule, setschedule] = useState([]);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 4);
  const getCurrentDayName = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    return days[dayIndex];
  };
  const currentDay = getCurrentDayName();

  const dayAfterTwoDays = twoDaysLater.getDate();
  const monthOfTwoDaysLater = twoDaysLater.toLocaleString("en-US", {
    month: "long",
  });
  const [refreshToken, setrefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setrefreshToken(localStorage.getItem("refreshToken"));
    setaccessToken(localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    // Function to refresh the access token
    const refreshTokenf = async () => {
      try {
        const response = await axios.post(
          "https://beep-zlaa.onrender.com/api/auth/refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = response.data;
        setaccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        const positionsResponse = await axios.get(
          "https://beep-zlaa.onrender.com/api/positions",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Handle successful response, update state with positions data
        const specialtiesData = positionsResponse.data; // Access the data directly
        setSpecialties(specialtiesData);
        setIsLoading(false);
        // Now fetch users with the updated access token
        axios
          .get("https://beep-zlaa.onrender.com/api/schedules", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Handle successful response, update state with users data
            const { schedules } = response.data;
            // Set the state with the extracted schedules array
            setschedule(schedules);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            // Handle error, set error state
            setError("Failed to fetch users");
            // If the error is due to unauthorized access, you might want to redirect to the login page
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after request completes
          });
        axios
          .get("https://beep-zlaa.onrender.com/api/users", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Handle successful response, update state with users data
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            // Handle error, set error state
            setError("Failed to fetch users");
            // If the error is due to unauthorized access, you might want to redirect to the login page
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after request completes
          });
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle token refresh failure, maybe redirect to login page
      }
    };

    // Call refreshToken function before fetching users
    refreshTokenf();
  }, []);

  useEffect(() => {
    // Function to count user statuses
    function extractUniquePositionNames(data) {
      // Use a Set to store unique position names
      const uniquePositionNames = new Set();

      // Iterate over the data array and add position names to the Set
      data.forEach((item) => {
        uniquePositionNames.add(item.positionName);
      });

      // Convert the Set to an array and return it
      return Array.from(uniquePositionNames);
    }
    // Execute countUserStatus after 1 minute
    const timer = setTimeout(() => {
      setextractedData(extractUniquePositionNames(specialties));
    }, 200); // 1 minute in milliseconds

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [specialties]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [showContainer, setShowContainer] = useState(false);
  const [date, setDate] = useState({
    startDate: tomorrow,
    endDate: twoDaysLater,
    key: "selection",
  });
  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handlesearchClick = (option) => {
    setInputValue(option);
  };
  const handleClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleClickfalse = () => {
    setShowDatePicker(false);
  };
  const handleClickfalseall = () => {
    setShowDatePicker(false);
    setshowfilterpicker(false);
  };
  const [showfilterpicker, setshowfilterpicker] = useState(false);

  const handleClickfilter = () => {
    setshowfilterpicker(!showfilterpicker);
  };
  const handleClickfilterfalse = () => {
    setshowfilterpicker(false);
  };
  const handlepublish = () => {
     console.log(cellTimeMapsecond)
    if (cellTimeMapsecond.length==0) {
      toast.warning(`You must provide at least one schedule.`, {
        position: "top-right",
        hideProgressBar: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        progressBar: {
          height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
        },
      });

    }else{
      for (let key in cellTimeMapsecond) {
        cellTimeMapsecond[key] = cellTimeMapsecond[key].filter((v, i, a) => a.findIndex(t => (
            t.employee === v.employee && 
            t.date === v.date && 
            t.shiftStartTime === v.shiftStartTime && 
            t.shiftEndTime === v.shiftEndTime
        )) === i);
    }
      addSchedules(cellTimeMapsecond);

    }
  };
  const addSchedules = (schedules) => {
    try {
    const schedulesArray = Object.values(schedules).flat();
    let formdata = new FormData();
    formdata.append("data", JSON.stringify(schedulesArray));
  
    axios
      .post(
        "https://beep-zlaa.onrender.com/api/schedules/bulk",
        schedulesArray,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then()
      .then(() => {setCellTimeMapsecond([])
        toast.success(`Published successfuly`, {
          position: "top-right",
          hideProgressBar: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          progressBar: {
            height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
          },
        })
      })
      .catch((error) => {
        // Extract error message from the response
        const errorMessage = error.response.data.error.message;
        console.error("Error adding schedules:", errorMessage);
        
        // Display the error message in toast
        toast.error(`Failed to add schedules: ${errorMessage}`, {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          progressBar: {
            height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
          },
        });
      });
    } catch (error) {
      toast.error(`Failed to add schedules: ${error}`, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        progressBar: {
          height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
        },
      });
    
    }
  };
  
  const startDate = date.startDate;
  const endDate = date.endDate;
  let currentDate = new Date();

  // Subtract one day from the current date
  currentDate.setDate(currentDate.getDate());

  // Now, currentDate represents the date one day before the current day

  // Assign this value to minDate
  let minDate = currentDate;
  const disableCurrentDay = (date) => {
    // Get the current date
    const currentDate = new Date();

    // Check if the given date is the same as the current date
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    );
  };

  // Now you can use this function to disable the current day
  // Example usage:
  let disabledDay = disableCurrentDay;
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  const [filteredData, setFilteredData] = useState([]);
  const [closestEmployees, setClosestEmployees] = useState([]);
  const [employeesname, setemployeesname] = useState([]);
  const [result, setResult] = useState('');
  const [period, setPeriod] = useState('');

  useEffect(() => {
    // Function to count user statuses

    const timer = setTimeout(() => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const filtered = schedule.filter((entry) => entry.date === currentDate);
      setFilteredData(filtered);
      setFilteredData(filtered);
    }, 100); // 1 minute in milliseconds

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [schedule]);

  useEffect(() => {
    // Get current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHours * 60 + currentMinutes;

    // Define a threshold for what you consider "close" in minutes
    const threshold = 30; // for example

    // Find the shifts close to the current time
    let closeShifts = [];

    filteredData.forEach((shift) => {
      const [startHours, startMinutes] = shift.shiftStartTime.split(":");
      const startTimeHours = parseInt(startHours);
      const startTimeMinutes = parseInt(startMinutes);
      const startTime = startTimeHours * 30 + startTimeMinutes;

      // Calculate the time difference in hours and minutes
      const hoursDifference = startTimeHours - currentHours;
      const minutesDifference = startTimeMinutes - currentMinutes;

      // Check if the shift is close enough and hasn't started yet
      if (
        hoursDifference === 0 &&
        minutesDifference <= threshold &&
        minutesDifference >= 0
      ) {
        closeShifts.push(shift.employee);
      } else if (
        hoursDifference === 1 &&
        30 - currentMinutes + startTimeMinutes <= threshold
      ) {
        closeShifts.push(shift.employee);
      }
    });

    setClosestEmployees(closeShifts);
  }, [filteredData]);

  useEffect(() => {
    const employeeNames = users
      .filter((user) => closestEmployees.includes(user._id))
      .map((user) => `${user.firstName} ${user.lastName}`);
    setemployeesname(employeeNames);
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    let closestShift = null;
    let closestTimeDifference = Infinity;

    filteredData.forEach((shift) => {
      const [shiftHours, shiftMinutes] = shift.shiftStartTime
        .split(":")
        .map(Number);
      const shiftTotalMinutes = shiftHours * 60 + shiftMinutes;

      // Calculate time difference in minutes
      const timeDifference = shiftTotalMinutes - currentTotalMinutes;

      // Check if the shift is in the future and closer than previous closest shift
      if (timeDifference > 0 && timeDifference < closestTimeDifference) {
        closestShift = shift;
        closestTimeDifference = timeDifference;
      }
    });

    if (closestShift) {
        const shiftStartHour = Number(closestShift.shiftStartTime.split(":")[0]);
        const  period = shiftStartHour < 12 ? "AM" : "PM";
        setPeriod(period);
       setResult( `${closestShift.shiftStartTime}`);
    } else {
      setResult("No upcoming shift") ;
    }
  }, [closestEmployees]);



  

  
 


  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setCurrentTime(new Date());
  }

  

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 30000); // Simulated loading time of 2 seconds
    return () => clearTimeout(timer);
  }, [schedule]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
   
      <div style={{ height: "100%", width: "25%", backgroundColor: "white" }}>
        <div
          style={{
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "50px",
              position: "relative",
              left: "120px",
              top: "-10px",
              backgroundColor: "#6d00fc",
            }}
          ></div>
          <div
            className="bellrow"
            style={{
              paddingRight: "20px",
              borderRadius: "20px",
              height: "50px",
              marginTop: "20px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 255, 0.01)",
            }}
          >
            <img className="userprofileicon" src={userprofile}></img>
            <div className="profilecolumn">
              <span className="name" style={{ alignSelf: "self-start" }}>
              {localStorage.getItem("firstName")}
              </span>
              <span className="role" style={{ alignSelf: "self-start" }}>
                HR managment
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "30%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.span
            initial={{ x: -10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="txt-sub-header-style"
            style={{ fontSize: "13px", marginLeft: "20px" }}
          >
            {currentDay} {ctime}
          </motion.span>
          <motion.div
            initial={{ x: -10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="txt-sub-header1"
            style={{ marginLeft: "20px" }}
          >
            Upcoming
          </motion.div>
          <div
            style={{
              height: "50%",
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "60%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <span
                style={{
                  fontFamily: "outfit",
                  fontSize:
                  result== "No upcoming shift"
                      ? "25px"
                      : "40px",
                  textAlign: "center",
                }}
              >
               {result}
              </span>
              <div
                style={{
                  height: "80%",
                  width: "4px",
                  backgroundColor: "#6d00fc",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              ></div>
              <span
                style={{
                  fontFamily: "outfit",
                  fontSize: "20px",
                  position: "relative",
                  top: "60%",
                }}
              >
                {period}
              </span>
            </div>
          </div>
          <span
            className="txt-sub-header1"
            style={{
              fontSize: "15px",
              fontFamily: "outfitmed",
              marginBottom: "20px",
            }}
          >
            Closing Hour Employees!
          </span>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              display: "flex",
              flexDirection: "row",
              width: "95%",
              height:window.innerHeight<=800 ? '120px': "90px",
              overflowX: "hidden",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
            }}
            onWheel={(e) => {
              const container = e.currentTarget;
              const scrollLeft = container.scrollLeft;
              container.scrollTo({
                top: 0,
                left: scrollLeft + e.deltaY,
                behavior: "auto",
              });
            }}
          >
            {employeesname.length > 0 ? (
  employeesname.map((name, index) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 'fit-content'
      }}
    >
 
      <div
        style={{
          height: "50px",
          width: '70px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            width: "70px",
            fontFamily: "outfitmed",
            textAlign: "center",
            padding: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          key={index}
        >
          {name}
        </span>
      </div>
      <div style={{ height: "10px" }} />
      <img
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          paddingLeft: "20px",
          alignSelf: "center",
          paddingRight: "20px",
        }}
        src={doctorimg}
      ></img>
    </div>
  ))
) : (
  
  <div style={{fontSize:'13px',fontFamily:'outfit',color:'#1f1f1f',textAlign:'center',display:'flex1',flexDirection:'row',justifyContent:'center',alignItems:'end',width:'100%'}}><span>There is no employee close to the current Time.</span></div>
)}

          </div>
        </div>
        <div>
          <motion.div
            initial={{ x: -10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="txt-sub-header"
            style={{ margin: "20px" }}
          >
            Today's Doctor Schedule
            <motion.span
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="txt-sub-header-style"
              style={{ fontSize: "13px" }}
            >
              Below is the timeline for today's consultations with a dedicated
              team of doctors.
            </motion.span>
          </motion.div>
        </div>

        <div
          style={{
            height: "350px",
            width: "20%",
            position: "relative",
            left: "40%",
            top: "10px",
            alignSelf: "center",
            justifyContent: "center",

            backgroundColor: "#6d00fc",
            borderRadius: "20px",
          }}
        >
          <span
            style={{
              position: "relative",
              top: "3px",
              textAlign: "center",
              alignSelf: "center",
              justifyContent: "center",
              height1: "100%",
              width: "100%",
              alignItems: "center",
              display: "flex",
              fontFamily: "outfitlight",
              fontSize: "12px",
              color: "white",
            }}
          >
            Today
          </span>
        </div>
        <div
          style={{
            height: "50%",
            overflowY: "auto",
            alignSelf: "end",
            marginTop: "50px",
            width: "100%",
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(0, 0, 255, 0.01)",
            position: "relative",
            top: "-370px",
          }}
        >
          <TimelineSchedule></TimelineSchedule>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          height: "100%",
        }}
      >
       
      <ToastContainer />
        <motion.h1
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="title"
          style={{ alignSelf: "start" }}
        >
          Schedule
        </motion.h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "fit-content",
            justifyContent: "space-between",
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <motion.div
              onClick={handleClickfalseall}
              initial={{ x: -10, opacity: 0.4 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "row",
                height: "45px",
                width: "200px",
                transition: "width 0.2s ease-in-out ",
                backgroundColor: "white",
                borderRadius: "22px",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.04)",
              }}
            >
              <img
                src={searchicon}
                onClick={() => handlesearchClick(inputValue)}
                style={{
                  height: "23px",
                  width: "23px",
                  alignSelf: "center",
                  margin: "10px",
                }}
              ></img>
              <input
                placeholder="Search"
                className="placeholder-color"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="text"
                onChange={handleInputChange}
                value={inputValue}
                style={{
                  transition: "width 0.2s ease-in-out ",
                  caretColor: "#dedddd",
                  color: inputValue ? "#1f1f1f" : "grey",
                  width: "100px",
                  fontFamily: inputValue ? "outfitlight" : "outfitlight",
                  fontSize: inputValue ? "15px" : "13px",
                  borderRadius: "22px",
                  border: isFocused ? "0px solid " : "0px solid ",
                  outline: "none",
                  padding: "8px",
                }}
              />
            </motion.div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <motion.div
                  onClick={handleClickfalse}
                  initial={{ x: -10, opacity: 0.4 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "45px",
                    width: "auto",
                    backgroundColor: "white",
                    borderRadius: "22px",
                    marginLeft: "20px",
                    boxShadow: "0px 0px 60px #828efc34",
                  }}
                >
                  <span
                    onClick={handleClickfilter}
                    style={{
                      fontFamily: "outfitlight",
                      fontSize: "14px",
                      color: "#c4c4c4",
                      alignSelf: "center",
                      marginLeft: "10px",
                      marginRight: "30px",
                      width: "20px",
                    }}
                  >
                    Filters
                  </span>
                  <img
                    onClick={handleClickfilter}
                    className="filtericon"
                    src={filtericon}
                  ></img>
                </motion.div>
                <AnimatePresence>
                  {showfilterpicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{
                        position: "absolute",
                        left: "0px",
                        zIndex: "2",
                        top: "60px",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          height: "200px",
                          overflow: "auto",
                          borderRadius: "5px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          scrollbarWidth: "none", // For Firefox
                          "-ms-overflow-style": "none", // For Internet Explorer and Edge
                          "&::-webkit-scrollbar": {
                            display: "none", // For WebKit browsers (Chrome, Safari)
                          },
                        }}
                      >
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          <li
                            style={{
                              cursor: "pointer",
                              padding: "5px",
                              borderRadius: "3px",
                              fontFamily: "outfitlight",
                              fontSize: "14px",
                              transition: "background-color 0.3s",
                              backgroundColor:
                                selectedOption === "Option 1"
                                  ? "#f0f5f5"
                                  : "transparent",
                            }}
                            onClick={() => handleOptionClick("")}
                          >
                            All
                          </li>
                          {extractedData.map((specialty, index) => (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                padding: "5px",
                                borderRadius: "3px",
                                fontFamily: "outfitlight",
                                fontSize: "14px",
                                transition: "background-color 0.3s",
                                backgroundColor:
                                  selectedOption === specialty
                                    ? "#f0f5f5"
                                    : "transparent",
                              }}
                              onClick={() => handleOptionClick(specialty)}
                            >
                              {specialty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                onClick={handleClick}
                initial={{ x: -10, opacity: 0.4 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "45px",
                  width: "auto",
                  position: "relative",
                  cursor: "pointer",
                  marginLeft: "40px",
                  backgroundColor: "white",
                  borderRadius: "22px",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.04)",
                }}
              >
                <span
                  className="colordaterange"
                  style={{
                    alignSelf: "center",
                    marginLeft: "20px",
                    marginRight: "0px",
                    fontFamily: "outfitlight",

                    fontSize: "13px",
                  }}
                >
                  {format(date.startDate, "MMM d")} -{" "}
                  {format(date.endDate, "MMM d(yyyy)")}{" "}
                </span>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 32 32"
                  fill="none"
                  id="schedule"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dash color"
                >
                  <path
                    d="M26.86 5.81H25.466V2.905H22.61V5.81H11.322V2.905H8.5V5.81H7.072C6.30133 5.81 5.63833 6.09583 5.083 6.6675C4.52767 7.23917 4.25 7.93333 4.25 8.75V29.12C4.25 29.9133 4.522 30.5958 5.066 31.1675C5.61 31.7392 6.27867 32.025 7.072 32.025H26.86C27.6533 32.025 28.322 31.7392 28.866 31.1675C29.41 30.5958 29.682 29.9133 29.682 29.12V8.75C29.682 7.93333 29.4043 7.23917 28.849 6.6675C28.2937 6.09583 27.6307 5.81 26.86 5.81ZM26.86 29.12H7.072V13.09H26.86V29.12ZM9.894 15.995H16.966V23.275H9.894V15.995Z"
                    fill="#737791"
                  />
                </svg>
              </motion.div>
              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      position: "absolute",
                      left: "0px",
                      zIndex: "2",
                      top: "60px",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <DateRangePicker
                      ranges={[date]}
                      showPreview={true}
                      showMonthArrow={true}
                      preventSnapRefocus={true}
                      minDate={minDate}
                      // disabledDay={disabledDay}
                      months={2}
                      onChange={handleChange}
                      dateDisplayFormat="MMM d"
                      showDateDisplay={false}
                      className="custom-date-range-picker"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div></div>
            <div></div>
            <motion.div
              initial={{ x: 10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="add-patient-button1"
              onClick={() => {
                handlepublish();
              }}
              style={{
                alignSelf: "center",
                height: "40px",
                marginRight: "50px",
                position: "relative",
                borderRadius: "50px",
              }}
            >
              {" "}
              {/* Motion div for "Register Doctor" text */}
              <motion.div
                onClick={handleClickfalse}
                initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="txt-button"
              >
                Publish
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div onClick={handleClickfalseall} className="table-container">
        {isLoading ? (
        // Render circular loader while loading
        <div style={{width:'100%',justifyContent:'center',alignItems:'center',display:'flex'}}> <img src={loadingimage1} style={{alignSelf:'center'}}></img></div>
       
      ) : (
        // Render YourComponent when not loading
        <YourComponent
          startDate={startDate}
          endDate={endDate}
          selectedchosenSpecialty={selectedOption}
          searchQuery={inputValue}
          setCellTimeMapsecond={setCellTimeMapsecond}
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
const CustomTimelineElement = ({
  date,
  title,
  subtitle,
  description,
  icon,
}) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "30px",
          width: "50px",
          backgroundColor: "#9D9DA7",
          borderRadius: "20px",
        }}
      ></div>
    </div>
  );
};
const ImageRow = ({ images }) => {
  return (
    <div style={{ position: "relative" }}>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          style={{
            position: "absolute",
            left: `${index * 12}px`,
            top: "0",
            maxWidth: "100%",
            height: "auto",
            height: "45px",
            width: "45px",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};
class TimelineSchedule extends React.Component {
  render() {
    const startTime = 6;
    const numberOfElements = 18;
    return (
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="scrollestyle"
      >
        <VerticalTimeline className="newstyle" lineColor="#F8F9FF">
          {generateTimelineElements(startTime, numberOfElements)}
          <VerticalTimelineElement
            iconStyle={{ background: "#F8F9FF", color: "#fff" }}
          />
          <div style={{ height: "20px" }}></div>
        </VerticalTimeline>
      </div>
    );
  }
}
const generateTimelineElements = (startTime, numberOfElements) => {
  const elements = [];
  const currentHour = new Date().getHours(); // Get current hour

  // Loop to generate elements based on the startTime and numberOfElements
  for (let i = 0; i < numberOfElements; i++) {
    const currentTime = startTime + i; // Increment by 1 hour for each element
    const displayTime =
      currentTime >= 12 ? `${currentTime}:00pm` : `${currentTime}:00am`; // Format time

    // Determine border color based on current time
    const borderColor = currentTime <= currentHour ? "#00FC7D" : "red";

    elements.push(
      <VerticalTimelineElement
        key={i}
        className="vertical-timeline-element--work"
        contentStyle={{ background: "transparent", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  transparent" }}
        date={
          <span
            style={{ fontSize: "12px", position: "relative", top: "-20px" }}
          >
            {displayTime}
          </span>
        }
        iconStyle={{
          background: "#F8F9FF",
          border: `3px solid ${borderColor}`, // Set border color dynamically
          color: "#fff",
          height: "20px",
          width: "20px",
          marginLeft: "-10px",
        }}
      >
        <div
          className="vertical-timeline-element-title"
          style={{ position: "relative", top: "-40px" }}
        >
          <ImageRow
            images={[doctorimg, doctorimg2, doctorimg, doctorimg2, userprofile]}
          />
        </div>
      </VerticalTimelineElement>
    );
  }

  return elements;
};
