import patient from "../assets/patienticonnew1.png";
import stafficon from "../assets/stafficon.png";
import operationicon from "../assets/operationicon1.png";
import messageicon from "../assets/bipeur.png";
import bipeur from "../assets/messageicon.png";
import registericon from "../assets/registericon.png";
import doctorimg from "../assets/doctorimg.jpg";
import roomicon from "../assets/roomicon2.png";
import userprofile from "../assets/17 1.png";
import React, { useState, useEffect, Component, useRef } from "react";
import Statistic from "../components/Donutchart";
import ProgressBar from "@ramonak/react-progress-bar";
import { motion } from "framer-motion";
import Areachart from "../components/Areachart";
import Seconchart from "../components/SecondPiechart";
import userinfos from "../assets/copy.png";
import emailicon from "../assets/emailicon1.png";
import phone from "../assets/phone.png";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://beep-didm.onrender.com/api";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            backgroundColor: "#F4EEFE",
            borderRadius: "15px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#2b04e8",
              borderRadius: "15px", // Color of the progress bar
            },
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          fontSize={"12px"}
          fontFamily={"outfitlight"}
          color="#2b04e8"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
function LinearProgressWithLabel1(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            backgroundColor: "#fef6ee",
            borderRadius: "15px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#ffa63f",
              borderRadius: "15px", // Color of the progress bar
            },
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          fontSize={"12px"}
          fontFamily={"outfitlight"}
          color="#ffa63f"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Dash = () => {
  const [progress, setProgress] = React.useState(30);
  const [progress1, setProgress1] = React.useState(50);
  const [showContainer, setShowContainer] = useState(false);
  const [showContainercontrol, setshowContainercontrol] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [users, setUsers] = useState([]);
  const [activeUsersCount, setActiveUsersCount] = useState("");
  const [inactiveUsersCount, setInactiveUsersCount] = useState("");
  const { t, i18n } = useTranslation();
  const languages = ["Ar(DZ)", "Eng(US)", "Fra(FR)"];
  const [showlanguagepicker, setshowlanguagepicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOptionlang")
  );
  const [refreshToken, setrefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [firstName, setfirstName] = useState(
    localStorage.getItem("firstName")
  );
  const [lastName, setlastName] = useState(
    localStorage.getItem("lastName")
  );

  useEffect(() => {
    setrefreshToken(localStorage.getItem("refreshToken"));
    setaccessToken(localStorage.getItem("accessToken"));
    setfirstName(localStorage.getItem("firstName"));
    setlastName(localStorage.getItem("lastName"));
  }, []);

  useEffect(() => {
    // Function to refresh the access token
    const refreshTokenf = async () => {
      try {
        const response = await axios.post(
          "https://beep-didm.onrender.com/api/auth/refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = response.data;
        setaccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        const positionsResponse = await axios.get(
          "https://beep-didm.onrender.com/api/positions",
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
          .get("https://beep-didm.onrender.com/api/users", {
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
    refreshTokenf().then(() => countUserStatus());
  }, []);

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

  const addUser = async () => {
    try {
      const response = await axios.post(
        "https://beep-didm.onrender.com/api/auth/refresh-token",
        {
          refreshToken: refreshToken,
        }
      );
      const { accessToken } = response.data;
      setaccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // Now fetch users with the updated access token
      axios
        .post(
          "https://beep-didm.onrender.com/api/users",
          {
            ...userForm,
            positionID: selectedPosition,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Response Data:", response.data);
        
          // Retrieve the password from the response data
          const { password } = response.data.newUser;
        
          // Reset the user form after successful submission
          setUserForm({
            firstName: "",
            lastName: "",
            positionID: "",
            email: "",
            phone: "",
          });
        
          // Fetch user data again to refresh
          axios
            .get("https://beep-didm.onrender.com/api/users", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              // Handle successful response, update state with users data
              setUsers(response.data);
              countUserStatus();
              toast.success(`User added successfully. Password: ${password}`, {
                position: "top-right",
                autoClose: 55000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                progressBar: {
                  height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
                },
              });
            });
        
          setError("");
          setIsLoading(false); // Set loading state to false after request completes
        })
        
        .catch((error) => {
          console.error("Error adding user:", error);
        
          // Extract error message from the response
          const errorMessage = error.response.data.error.message;
        
          toast.error(`Failed to add: ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
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
        
          setIsLoading(false); // Set loading state to false after request completes
        });
        
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, maybe redirect to login page
    }
  };
  const addRoom = async () => {
    try {
      const response = await axios.post(
        "https://beep-didm.onrender.com/api/auth/refresh-token",
        {
          refreshToken: refreshToken,
        }
      );
      const { accessToken } = response.data;
      setaccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // Now fetch users with the updated access token
      axios
        .post(
          "https://beep-didm.onrender.com/api/rooms",
          {
            "roomNumber": RoomNumber.toString(),
            "roomType":  RoomType.toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Response Data:", response.data);
       
        
         
          // Fetch user data again to refresh
          axios
            .get("https://beep-didm.onrender.com/api/users", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              // Handle successful response, update state with users data
              setUsers(response.data);
              countUserStatus();
              toast.success(`Room added succesfuly`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                progressBar: {
                  height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
                },
              });
            });
        
          setError("");
          setIsLoading(false); // Set loading state to false after request completes
        })
        
        .catch((error) => {
          console.error("Failed to add:", error);
        
          // Extract error message from the response
          const errorMessage = error.response.data.error.message;
        
          toast.error(`Failed to add: ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
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
        
          setIsLoading(false); // Set loading state to false after request completes
        });
        
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, maybe redirect to login page
    }
  };
  const addSpeciality = async () => {
    try {
      const response = await axios.post(
        "https://beep-didm.onrender.com/api/auth/refresh-token",
        {
          refreshToken: refreshToken,
        }
      );
      const { accessToken } = response.data;
      setaccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // Now fetch users with the updated access token
      axios
        .post(
          "https://beep-didm.onrender.com/api/positions",
          {
            "positionName": Speciality.toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Response Data:", response.data);
       
        
         
          // Fetch user data again to refresh
          axios
            .get("https://beep-didm.onrender.com/api/users", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              // Handle successful response, update state with users data
              setUsers(response.data);
              countUserStatus();
              toast.success(`Speciality added succesfuly`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                progressBar: {
                  height: "2px", // Set the height of the bottom bar of the progress indicator to 2px
                },
              });
            });
        
          setError("");
          setIsLoading(false); // Set loading state to false after request completes
        })
        
        .catch((error) => {
          console.error("Failed to add:", error);
        
          // Extract error message from the response
          const errorMessage = error.response.data.error.message;
        
          toast.error(`Failed to add: ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
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
        
          setIsLoading(false); // Set loading state to false after request completes
        });
        
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, maybe redirect to login page
    }
  };

  useEffect(() => {
    // Function to count user statuses
    const countUserStatus = () => {
      let activeCount = 0;
      let inactiveCount = 0;

      users.forEach((user) => {
        if (user.isActive) {
          activeCount++;
        } else {
          inactiveCount++;
        }
      });

      setActiveUsersCount(activeCount);
      setInactiveUsersCount(inactiveCount);
    };

    // Execute countUserStatus after 1 minute
    const timer = setTimeout(() => {
      countUserStatus();
    }, 500); // 1 minute in milliseconds

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [users]);

  const countUserStatus = () => {
    let activeCount = 0;
    let inactiveCount = 0;

    users.forEach((user) => {
      if (user.isActive) {
        activeCount++;
      } else {
        inactiveCount++;
      }
    });

    setActiveUsersCount(activeCount);
    setInactiveUsersCount(inactiveCount);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOptionlang", option);
    if (option == "Ar(DZ)") {
      i18n.changeLanguage("ar");
    }
    if (option == "Eng(US)") {
      i18n.changeLanguage("en");
    }
    if (option == "Fra(FR)") {
      i18n.changeLanguage("fr");
    }
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOptionlang");
    if (storedOption) {
      setSelectedOption(storedOption);
      // Here you can also update the language based on the stored option
      if (storedOption === "Ar(DZ)") {
        i18n.changeLanguage("ar");
      } else if (storedOption === "Eng(US)") {
        i18n.changeLanguage("en");
      } else if (storedOption === "Fra(FR)") {
        i18n.changeLanguage("fr");
      }
    }
  }, []);

  const handleClickfilter = () => {
    setshowlanguagepicker(!showlanguagepicker);
  };

  const handleClickfilterfalse = () => {
    setshowlanguagepicker(false);
  };

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    positionID: "",
    email: "",
    phone: "",
  });

  const [RoomNumber, setRoomNumber] = useState('');
  const [RoomType, setRoomType] = useState('');
  const [Speciality, setSpeciality] = useState('');
  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    // Remove any non-digit characters from the input
    const formattedPhone = inputPhone.replace(/\D/g, "");

    // Check if the formatted phone number has exactly 10 digits
    if (formattedPhone.length <= 10) {
      setUserForm({ ...userForm, phone: formattedPhone });
    }
  };

  return (
    <div className="bigcolumn">
    
      <ToastContainer />
      <div className="dashrow">
        <motion.h1
          initial={{ x: -10, opacity: 0 }} // Initial position and opacity
          animate={{ x: 0, opacity: 1 }} // Final position and opacity
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="title"
        >
          {t("logintext14")}
        </motion.h1>
        <div className="wrapper">
          <div className="search_box">
            <motion.span
              initial={{ y: 5, opacity: 0 }} // Initial position and opacity
              animate={{ y: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="searchtext"
            >
              {t("logintext16")}
            </motion.span>
            <div className="search_btn"></div>
            <input
              type="text"
              className="input_search"
              placeholder={t("logintext15")}
            />
          </div>
        </div>
        <div className="thirdsubrow">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              userSelect: "none",
            }}
            onClick={() => {
              handleClickfilter();
              setError(false);
            }}
          >
            <div
              className="languagetext"
              style={{ position: "relative", left: "-5px" }}
            >
              {selectedOption}
            </div>
          </div>
          {showlanguagepicker && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "absolute",
                right: "13.4%",
                zIndex: "2",
                top: "2%",
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  height: "fit-content",
                  width: "90px",
                  overflow: "auto",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 255, 0.1)",
                  scrollbarWidth: "none", // For Firefox
                  "-ms-overflow-style": "none", // For Internet Explorer and Edge
                  "&::-webkit-scrollbar": {
                    display: "none", // For WebKit browsers (Chrome, Safari)
                  },
                }}
              >
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {languages.map((specialty, index) => (
                    <li
                      key={index}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "3px",
                        textAlign: "center",
                        fontFamily: "outfitmed",
                        fontSize: "13px",
                        transition: "background-color 0.3s",
                        backgroundColor:
                          selectedOption === specialty
                            ? "#f0f5f5"
                            : "transparent",
                      }}
                      className="languagetext"
                      onClick={() => handleOptionClick(specialty)}
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          <div className="bellrow">
            <svg
              className="bellicon"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75005 4.75C9.33584 4.75 9.00005 5.08579 9.00005 5.5C9.00005 5.91421 9.33584 6.25 9.75005 6.25V4.75ZM12.6751 6.25C13.0893 6.25 13.4251 5.91421 13.4251 5.5C13.4251 5.08579 13.0893 4.75 12.6751 4.75V6.25ZM9.48794 17.0191C9.48249 16.605 9.14232 16.2736 8.72814 16.2791C8.31396 16.2845 7.98262 16.6247 7.98807 17.0389L9.48794 17.0191ZM11.2126 19.5L11.2228 18.7501C11.216 18.75 11.2092 18.75 11.2023 18.7501L11.2126 19.5ZM14.437 17.0389C14.4425 16.6247 14.1111 16.2845 13.697 16.2791C13.2828 16.2736 12.9426 16.605 12.9372 17.0191L14.437 17.0389ZM8.73703 17.779C9.15124 17.779 9.48703 17.4432 9.48703 17.029C9.48703 16.6148 9.15124 16.279 8.73703 16.279V17.779ZM7.63723 17.029L7.631 17.779H7.63723V17.029ZM5.85005 15.168L6.60005 15.1732V15.168H5.85005ZM6.57058 12.676L5.82897 12.5641L5.82888 12.5647L6.57058 12.676ZM6.76558 11.276L7.50406 11.4069C7.50578 11.3972 7.50731 11.3875 7.50865 11.3777L6.76558 11.276ZM11.2126 7.147L11.2433 6.39763C11.2228 6.39679 11.2022 6.39679 11.1817 6.39763L11.2126 7.147ZM15.6595 11.273L14.9165 11.3751C14.9177 11.3836 14.919 11.392 14.9204 11.4004L15.6595 11.273ZM15.8545 12.673L16.5962 12.5617L16.596 12.5605L15.8545 12.673ZM16.5751 15.165L15.825 15.165L15.8251 15.1706L16.5751 15.165ZM14.7879 17.027L14.7879 17.777L14.7941 17.777L14.7879 17.027ZM13.6871 16.277C13.2729 16.277 12.9371 16.6128 12.9371 17.027C12.9371 17.4412 13.2729 17.777 13.6871 17.777V16.277ZM8.73703 16.277C8.32281 16.277 7.98703 16.6128 7.98703 17.027C7.98703 17.4412 8.32281 17.777 8.73703 17.777V16.277ZM13.6871 17.777C14.1013 17.777 14.4371 17.4412 14.4371 17.027C14.4371 16.6128 14.1013 16.277 13.6871 16.277V17.777ZM9.75005 6.25H12.6751V4.75H9.75005V6.25ZM7.98807 17.0389C8.01146 18.8183 9.4421 20.2742 11.2228 20.2499L11.2023 18.7501C10.2859 18.7625 9.50091 18.006 9.48794 17.0191L7.98807 17.0389ZM11.2023 20.2499C12.983 20.2742 14.4136 18.8183 14.437 17.0389L12.9372 17.0191C12.9242 18.006 12.1392 18.7625 11.2228 18.7501L11.2023 20.2499ZM8.73703 16.279H7.63723V17.779H8.73703V16.279ZM7.64345 16.279C7.08063 16.2744 6.59573 15.7972 6.60003 15.1732L5.10007 15.1628C5.09031 16.5785 6.20512 17.7671 7.631 17.779L7.64345 16.279ZM6.60005 15.168C6.60005 14.891 6.69326 14.6047 6.85708 14.1992C7.00452 13.8342 7.23096 13.3291 7.31227 12.7873L5.82888 12.5647C5.78052 12.8869 5.6467 13.1908 5.46629 13.6373C5.30227 14.0433 5.10005 14.571 5.10005 15.168H6.60005ZM7.31219 12.7879C7.40448 12.1759 7.4489 11.7181 7.50406 11.4069L6.02709 11.1451C5.97305 11.4499 5.90047 12.0901 5.82897 12.5641L7.31219 12.7879ZM7.50865 11.3777C7.77569 9.42625 9.35923 7.97389 11.2434 7.89637L11.1817 6.39763C8.54483 6.50613 6.38434 8.53009 6.0225 11.1743L7.50865 11.3777ZM11.1818 7.89637C13.0651 7.97369 14.6484 9.42473 14.9165 11.3751L16.4025 11.1709C16.0392 8.52798 13.8791 6.50584 11.2433 6.39763L11.1818 7.89637ZM14.9204 11.4004C14.9759 11.7223 15.0202 12.1736 15.113 12.7855L16.596 12.5605C16.525 12.0924 16.4504 11.4457 16.3986 11.1456L14.9204 11.4004ZM15.1128 12.7843C15.1941 13.3261 15.4206 13.8312 15.568 14.1962C15.7318 14.6017 15.8251 14.888 15.8251 15.165H17.3251C17.3251 14.568 17.1228 14.0403 16.9588 13.6343C16.7784 13.1878 16.6446 12.8839 16.5962 12.5617L15.1128 12.7843ZM15.8251 15.1706C15.8297 15.7949 15.3447 16.2724 14.7817 16.277L14.7941 17.777C16.2205 17.7651 17.3355 16.5756 17.325 15.1594L15.8251 15.1706ZM14.7879 16.277H13.6871V17.777H14.7879V16.277ZM8.73703 17.777H13.6871V16.277H8.73703V17.777Z"
                fill="#737791"
              />
            </svg>
            <div className="notificationmark"></div>
          </div>
          <div className="bellrow">
            <img className="userprofileicon" src={userprofile}></img>
            <div className="profilecolumn">
              <span className="name">  {firstName.toString()}</span>
              <span className="role">Admin</span>
            </div>
          </div>
        </div>
      </div>
      <div className="left-cstm-circle"></div>
      <motion.div
        initial={{ x: -10, opacity: 0 }} // Initial position and opacity
        animate={{ x: 0, opacity: 1 }} // Final position and opacity
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="header-row"
        style={{ justifyContent: "space-between", display: "flex" }}
        onClick={handleClickfilterfalse}
      >
        <motion.div
          initial={{ x: -10, opacity: 0 }} // Initial position and opacity
          animate={{ x: 0, opacity: 1 }} // Final position and opacity
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="txt-sub-header"
        >
          {t("logintext17")}
          <motion.span
            initial={{ x: -10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="txt-sub-header-style"
          >
            {t("logintext18")} Bouchebtoul.
          </motion.span>
        </motion.div>
        {/* Motion div for adding patient button */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight:localStorage.getItem("selectedOptionlang") === "Eng(US)"
                ? "0%"
                : localStorage.getItem("selectedOptionlang") === "Ar(DZ)"
                ? "0%"
                : "0%",
           
          }}
        >
          <motion.div
            initial={{ x: 10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="add-patient-button"
            onClick={() => {
              setshowContainercontrol(true);
            }}
          >
            {/* Motion span for plus sign */}
            <motion.span
              initial={{ x: 10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                fontSize: "20px",
                fontFamily: "outfitmed",
                color: "white",
                position: "relative",
                right: "-12px",
                alignSelf: "center",
                paddingLeft: "5px",
              }}
            >
              +{" "}
            </motion.span>{" "}
            {/* Motion div for "Register Doctor" text */}
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="txt-button"
              style={{
                fontSize:
                  localStorage.getItem("selectedOptionlang") === "Eng(US)"
                    ? "13.5px"
                    : localStorage.getItem("selectedOptionlang") === "Ar(DZ)"
                    ? "15px"
                    : "13.2px",
                textAlign: "center",
              }}
            >
              {t("logintext49")}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="add-patient-button"
            onClick={() => {
              setShowContainer(true);
            }}
          >
            {/* Motion span for plus sign */}
            <motion.span
              initial={{ x: 10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                fontSize: "20px",
                fontFamily: "outfitmed",
                color: "white",
                position: "relative",
                right: "-12px",
                alignSelf: "center",
                paddingLeft: "5px",
              }}
            >
              +{" "}
            </motion.span>{" "}
            {/* Motion div for "Register Doctor" text */}
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="txt-button"
              style={{
                fontSize:
                  localStorage.getItem("selectedOptionlang") === "Eng(US)"
                    ? "13.5px"
                    : localStorage.getItem("selectedOptionlang") === "Ar(DZ)"
                    ? "15px"
                    : "13.2px",
                textAlign: "center",
              }}
            >
              {t("logintext19")}
            </motion.div>
          </motion.div>
        </div>
        {showContainercontrol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overlay"
            onClick={() => setshowContainercontrol(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute-container"
              style={{
                height: window.innerHeight * 0.6,
                width: window.innerWidth * 0.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
               <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "outfit",
                  marginTop: "20px",
                  width: "100%",
                  height: "10%",
                }}
              >
                
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "5%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                    }}
                  >
                    {t("logintext65")}
                  </span>
                  
                </div>
                <div style={{ width: "100px" }}></div>
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                      <input
                        className="input-create-style1"
                        placeholder="Enter roomNumber"
                        type="text"
                        style={{ fontFamily: "outfitmed" }}
                        value={RoomNumber}
                        onChange={(e) =>
                          setRoomNumber(e.target.value)
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "14%",
                    }}
                  >
                  
                  </div>
                </div>
              </div>
              <div style={{height:'50px'}}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "outfit",
                  marginTop: "20px",
                  width: "100%",
                  height: "10%",
                }}
              >
                
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "5%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                    }}
                  >
                    {t("logintext66")}
                  </span>
                  
                </div>
                <div style={{ width: "100px" }}></div>
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                      <input
                        className="input-create-style1"
                        placeholder="Enter RoomType"
                        type="text"
                        style={{ fontFamily: "outfitmed" }}
                        value={RoomType}
                        onChange={(e) =>
                          setRoomType(e.target.value)
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "14%",
                    }}
                  >
                  
                  </div>
                </div>
              </div>
              <div style={{height:'20px'}}></div>
              <motion.div
                initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                onClick={() => {
                  setshowContainercontrol(false);
                  addRoom();
                }}
                style={{
                  width: "fit-content",
                  marginTop: "50px",
                  height: "50px",
                }}
                className="add-patient-button1"
              >
                <motion.span
                  initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    fontSize: "20px",
                    fontFamily: "outfitmed",
                    color: "white",
                    position: "relative",
                    right: "-12px",
                    alignSelf: "center",
                    paddingLeft: "5px",
                  }}
                >
                  {" "}
                </motion.span>{" "}
                <motion.div
                  initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="txt-button"
                >
                  {t("logintext67")}
                </motion.div>
              </motion.div>
              <div style={{height:'50px'}}></div>
               
              <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                      
                    }}
                  >
                    {t("logintext68")}
                  </span>
                  
                </div>
                <div style={{height:'20px'}}></div>
              <div
                  style={{
                    height: "11%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                      <input
                        className="input-create-style1"
                        placeholder="Enter Speciality"
                        type="text"
                        style={{ fontFamily: "outfitmed" }}
                        value={Speciality}
                        onChange={(e) =>
                          setSpeciality(e.target.value)
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "14%",
                    }}
                  >
                  
                  </div>
                </div>
                <motion.div
                initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                onClick={() => {
                  setshowContainercontrol(false);
                  addSpeciality();
                }}
                style={{
                  width: "fit-content",
                  marginTop: "20px",
                  height: "50px",
                }}
                className="add-patient-button1"
              >
                <motion.span
                  initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    fontSize: "20px",
                    fontFamily: "outfitmed",
                    color: "white",
                    position: "relative",
                    right: "-12px",
                    alignSelf: "center",
                    paddingLeft: "5px",
                  }}
                >
                  {" "}
                </motion.span>{" "}
                <motion.div
                  initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="txt-button"
                >
                  {t("logintext68")}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {showContainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overlay"
            onClick={() => setShowContainer(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute-container"
              style={{
                height: window.innerHeight * 0.6,
                width: window.innerWidth * 0.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "outfit",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginTop: "20px",
                  width: "100%",
                  height: "20%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "45px" }}>{t("logintext20")}</span>
                  <div
                    style={{
                      height: "10px",
                      width: "10px",
                      backgroundColor: "#6200ff",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "20px",
                  height: "20%",
                }}
              >
                <div
                  style={{
                    height: "45.5%",
                    width: "40%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "80%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "outfitmed",
                          color: "#1f1f1f",
                        }}
                      >
                        {t("logintext21")}
                      </span>
                      <div
                        style={{
                          height: "5px",
                          width: "5px",
                          backgroundColor: "#6200ff",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div style={{ marginLeft: "10px", marginTop: "0px" }}>
                      <input
                        className="input-create-style"
                        placeholder={t("logintext47")}
                        type="text"
                        autoFocus
                        value={userForm.firstName}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            firstName: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "30%",
                    }}
                  >
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src={userinfos}
                    ></img>
                  </div>
                </div>
                <div style={{ width: "20px" }}></div>
                <div
                  style={{
                    height: "45.5%",
                    width: "40%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "80%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "outfitmed",
                          color: "#1f1f1f",
                        }}
                      >
                        {t("logintext22")}
                      </span>
                      <div
                        style={{
                          height: "5px",
                          width: "5px",
                          backgroundColor: "#6200ff",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div style={{ marginLeft: "10px", marginTop: "0px" }}>
                      <input
                        className="input-create-style"
                        placeholder={t("logintext48")}
                        type="text"
                        value={userForm.lastName}
                        onChange={(e) =>
                          setUserForm({ ...userForm, lastName: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "30%",
                    }}
                  >
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src={userinfos}
                    ></img>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  height: "8%",
                  marginRight: "8%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10%",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "5%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                    }}
                  >
                    {t("logintext23")}
                  </span>
                  <div
                    style={{
                      height: "5px",
                      width: "5px",
                      backgroundColor: "#6200ff",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <div style={{ width: "20px" }}></div>
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                      <input
                        className="input-create-style1"
                        placeholder="example@gmail.com"
                        type="email"
                        style={{ fontFamily: "outfitmed" }}
                        value={userForm.email}
                        onChange={(e) =>
                          setUserForm({ ...userForm, email: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "14%",
                    }}
                  >
                    <img
                      style={{ height: "70px", width: "70px" }}
                      src={emailicon}
                    ></img>
                  </div>
                </div>
              </div>
              <div style={{ height: "58px" }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  height: "8%",
                  marginRight: "8%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10%",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "5%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                    }}
                  >
                    {t("logintext24")}
                  </span>
                  <div
                    style={{
                      height: "5px",
                      width: "5px",
                      backgroundColor: "#6200ff",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <div style={{ width: "20px" }}></div>
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        marginTop: "5px",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ marginLeft: "5px", marginTop: "4px" }}>
                      <input
                        className="input-create-style"
                        placeholder="+213 00-00-00-00-00"
                        type="txt"
                        style={{ fontFamily: "outfitlight" }}
                        value={userForm.phone}
                        onChange={handlePhoneChange}
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "14%",
                    }}
                  >
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src={phone}
                    ></img>
                  </div>
                </div>
              </div>
              <div style={{ height: "58px" }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  height: "8%",
                  marginRight: "8%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10%",
                    marginTop: "-5px",
                    justifyContent: "start",
                    width: "5%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "outfitmed",
                      color: "#1f1f1f",
                    }}
                  >
                    {t("logintext25")}
                  </span>
                </div>
                <div style={{ width: "50px" }}></div>
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="input-back-color"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "90%",
                      width: "90%",
                    }}
                  >
                    <div
                      style={{
                        width: window.innerWidth * 0.35,
                        height: "100%",
                      }}
                    >
                      <select
                        className="input-container"
                        style={{
                          backgroundColor: "#F7F4FF",
                          outline: "none",
                          border: "0px",
                          marginRight: "20px",
                          fontSize: "17px",
                          fontFamily: "outfitlight",
                          height: "100%",
                          width: "95%",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                      >
                        <option value="">{t("logintext26")}</option>
                        {specialties.map((specialty) => (
                          <option key={specialty._id} value={specialty._id}>
                            {specialty.positionName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                onClick={() => {
                  setShowContainer(false);
                  addUser();
                }}
                style={{
                  width: "fit-content",
                  marginTop: "50px",
                  height: "50px",
                }}
                className="add-patient-button1"
              >
                <motion.span
                  initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    fontSize: "20px",
                    fontFamily: "outfitmed",
                    color: "white",
                    position: "relative",
                    right: "-12px",
                    alignSelf: "center",
                    paddingLeft: "5px",
                  }}
                >
                  {" "}
                </motion.span>{" "}
                <motion.div
                  initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="txt-button"
                >
                  <img src={registericon} className="doctor-img"></img>
                  {t("logintext27")}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      <div className="main-content-row" onClick={handleClickfilterfalse}>
        <div className="maincontent-leftcol">
          <div className="overview-row">
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="subcontainer1"
            >
              <img src={patient} className="iconsize"></img>
              <div
                className="txt-overview-row"
                style={{
                  width: selectedOption == "Fra(FR)" ? "130px" : "fit-content",
                }}
              >
                <span
                  style={{
                    fontFamily: "outfitlight",
                    fontSize: "15px",
                    color: "#afb2be",
                    alignSelf: "self-start",
                    paddingRight: "30px",
                  }}
                >
                  {t("logintext28")}
                </span>
                <span
                  style={{
                    fontFamily: "outfitbold",
                    fontSize: "20px",
                    color: "#13203f",
                    paddingRight: "30px",
                  }}
                >
                  24,904
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="subcontainer1"
            >
              <img src={stafficon} className="iconsize"></img>
              <div
                className="txt-overview-row"
                style={{
                  width: selectedOption == "Fra(FR)" ? "150px" : "fit-content",
                }}
              >
                <span
                  style={{
                    fontFamily: "outfitlight",
                    fontSize: "15px",
                    color: "#afb2be",
                    alignSelf: "self-start",
                    paddingRight: "30px",
                  }}
                >
                  {t("logintext29")}
                </span>
                <span
                  style={{
                    fontFamily: "outfitbold",
                    fontSize: "20px",
                    color: "#13203f",
                    paddingRight: "30px",
                  }}
                >
                  1,420
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="subcontainer1"
            >
              <img src={roomicon} className="iconsize"></img>
              <div className="txt-overview-row">
                <span
                  style={{
                    fontFamily: "outfitlight",
                    fontSize: "15px",
                    color: "#afb2be",
                    alignSelf: "self-start",
                    paddingRight: "30px",
                  }}
                >
                  {t("logintext30")}
                </span>
                <span
                  style={{
                    fontFamily: "outfitbold",
                    fontSize: "20px",
                    color: "#13203f",
                    paddingRight: "30px",
                  }}
                >
                  42
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="subcontainer"
            >
              <img src={operationicon} className="iconsize"></img>
              <div className="txt-overview-row">
                <span
                  style={{
                    fontFamily: "outfitlight",
                    fontSize: "15px",
                    color: "#afb2be",
                    alignSelf: "self-start",
                    paddingRight: "30px",
                  }}
                >
                  {t("logintext31")}
                </span>
                <span
                  style={{
                    fontFamily: "outfitbold",
                    fontSize: "20px",
                    color: "#13203f",
                    paddingRight: "30px",
                  }}
                >
                  1,000
                </span>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }} // Initial position and opacity
            animate={{ y: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="areachart-container"
          >
            <div className="colm-area-chart">
              <div className="row-operation-txt-butt">
                <span className="txt-operation-stat">{t("logintext32")} </span>
              </div>
              <div className="row-txt-stat">
                <motion.div
                  initial={{ x: -20, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#6d00fc",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(83, 5, 228, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext33")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -25, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#ffa63f",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(255, 166, 63, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext34")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "red",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(255, 112, 125, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext35")}
                  </span>
                </motion.div>
              </div>
              <div className="areachart-container1">
                <Areachart></Areachart>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -10, opacity: 0 }} // Initial position and opacity
            animate={{ x: 0, opacity: 1 }} // Final position and opacity
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="header-row"
            style={{ marginTop: "20px" }}
          >
            <motion.div
              initial={{ x: -10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="txt-sub-header"
            >
              {t("logintext36")}
              <motion.span
                initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="txt-sub-header-style"
              >
                {t("logintext37")}
              </motion.span>
            </motion.div>
          </motion.div>
          <div className="piecharts-row">
            {" "}
            <motion.div
              initial={{ y: -30, opacity: 0 }} // Initial position and opacity
              animate={{ y: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="piechart"
            >
              <span className="txt-operation-stat">{t("logintext38")}</span>
              <Statistic></Statistic>
              <div className="row-txt-stat">
                <motion.div
                  initial={{ x: -20, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#e2eefe",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px #e2eefe",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext39")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -25, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#016eff",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(1, 110, 255, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext40")}
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -30, opacity: 0 }} // Initial position and opacity
              animate={{ y: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="piechart"
            >
              <span className="txt-operation-stat">{t("logintext41")}</span>
              <Seconchart></Seconchart>

              <div className="row-txt-stat">
                <motion.div
                  initial={{ x: -20, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#e2eefe",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px #e2eefe",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext42")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -25, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#016eff",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(1, 110, 255, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext43")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -25, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Final position and opacity
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="sub-txt-row-stat"
                >
                  <motion.div
                    style={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#5fe1e0",
                      borderRadius: "5px",
                      alignSelf: "center",
                      boxShadow: "0px 1px 9px rgba(95, 225, 224, 0.59)",
                    }}
                  ></motion.div>
                  <span
                    style={{
                      fontFamily: "outfitmed",
                      fontSize: "12px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      alignSelf: "center",
                    }}
                  >
                    {t("logintext44")}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="maincontent-rightcol">
          <div className="second-row-rightcol">
            <motion.div
              style={{ margin: "10px" }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="progress-bar-style"
            >
              <span style={{ fontFamily: "outfitmed" }}>
                {t("logintext45")}
              </span>
              <LinearProgressWithLabel value={progress} />
            </motion.div>
            <motion.div
              style={{ marginBottom: "10px" }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="progress-bar-style"
            >
              <span style={{ fontFamily: "outfitmed", fontSize: "15px" }}>
                {t("logintext46")}
              </span>
              <LinearProgressWithLabel1 value={progress1} />
            </motion.div>
          </div>

          <div className="first-row-rightcol">
            <div className="row-doctorlist">
              <div className="rowof-on-off-doct">
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="totalactive-doctor"
                  style={{
                    color: "#3bcfad",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_8303_9)">
                      <path
                        d="M800 466.667C800 488.554 795.689 510.226 787.313 530.447C778.937 550.668 766.661 569.041 751.184 584.518C735.708 599.994 717.335 612.271 697.114 620.647C676.893 629.022 655.22 633.333 633.333 633.333H600V600H633.333C666.915 600.161 699.314 587.613 724.027 564.875C748.739 542.137 763.936 510.892 766.565 477.413C769.193 443.934 759.06 410.7 738.2 384.383C717.339 358.067 687.295 340.615 654.1 335.533L627.767 331.4L626.033 304.8C623.38 264.744 607.147 226.791 580.013 197.206C552.88 167.621 516.468 148.173 476.791 142.074C437.113 135.976 396.542 143.59 361.776 163.66C327.009 183.73 300.127 215.057 285.567 252.467L272.333 286.333L239.767 270.233C229.373 265.079 217.935 262.377 206.333 262.333C192.558 262.337 179.067 266.256 167.433 273.633C159.175 278.828 152.033 285.615 146.424 293.599C140.816 301.582 136.853 310.602 134.767 320.133L131 336.967L115.133 343.633C86.6884 355.514 63.2387 376.883 48.7747 404.106C34.3107 431.328 29.7262 462.721 35.8012 492.943C41.8762 523.165 58.2354 550.348 82.095 569.867C105.955 589.386 135.84 600.034 166.667 600H300V633.333H166.667C128.169 633.337 90.8567 620.012 61.0691 595.624C31.2815 571.235 10.8555 537.287 3.26085 499.546C-4.33377 461.804 1.37141 422.597 19.4072 388.585C37.4431 354.574 66.6972 327.854 102.2 312.967C105.246 299.145 111.004 286.065 119.14 274.484C127.277 262.903 137.63 253.052 149.6 245.5C166.557 234.717 186.238 228.993 206.333 229C223.057 229.028 239.55 232.906 254.533 240.333C271.854 195.868 303.817 158.638 345.148 134.786C386.479 110.935 434.707 101.889 481.872 109.14C529.037 116.392 572.32 139.508 604.577 174.674C636.834 209.839 656.137 254.952 659.3 302.567C698.462 308.661 734.159 328.544 759.956 358.632C785.754 388.72 799.955 427.033 800 466.667ZM645.433 431L450 626.433L354.567 531L331 554.567L450 673.567L669 454.567L645.433 431Z"
                        fill="#3bcfad"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8303_9">
                        <rect width="800" height="800" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                  {activeUsersCount}
                </motion.span>
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="totalactive-doctor"
                  style={{
                    color: "red",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_8304_23)">
                      <path
                        d="M800 466.667C800 488.554 795.689 510.226 787.313 530.447C778.937 550.668 766.661 569.041 751.184 584.518C735.708 599.994 717.335 612.271 697.114 620.647C676.893 629.022 655.22 633.333 633.333 633.333H600V600H633.333C666.915 600.161 699.314 587.613 724.027 564.875C748.739 542.137 763.936 510.892 766.565 477.413C769.193 443.934 759.06 410.7 738.2 384.383C717.339 358.067 687.295 340.615 654.1 335.533L627.767 331.4L626.033 304.8C623.38 264.744 607.147 226.791 580.013 197.206C552.88 167.621 516.468 148.173 476.791 142.074C437.113 135.976 396.542 143.59 361.776 163.66C327.009 183.73 300.127 215.057 285.567 252.467L272.333 286.333L239.767 270.233C229.373 265.079 217.935 262.377 206.333 262.333C192.558 262.337 179.067 266.256 167.433 273.633C159.175 278.828 152.033 285.615 146.424 293.599C140.816 301.582 136.853 310.602 134.767 320.133L131 336.967L115.133 343.633C86.6884 355.514 63.2387 376.883 48.7747 404.106C34.3107 431.328 29.7262 462.721 35.8012 492.943C41.8762 523.165 58.2354 550.348 82.095 569.867C105.955 589.386 135.84 600.034 166.667 600H366.667V633.333H166.667C128.169 633.337 90.8567 620.012 61.0691 595.624C31.2815 571.235 10.8555 537.287 3.26085 499.546C-4.33377 461.804 1.37141 422.597 19.4072 388.585C37.4431 354.574 66.6972 327.854 102.2 312.967C105.246 299.145 111.004 286.065 119.14 274.484C127.277 262.903 137.63 253.052 149.6 245.5C166.557 234.717 186.238 228.993 206.333 229C223.057 229.028 239.55 232.906 254.533 240.333C271.854 195.868 303.817 158.638 345.148 134.786C386.479 110.935 434.707 101.889 481.872 109.14C529.037 116.392 572.32 139.508 604.577 174.674C636.834 209.839 656.137 254.952 659.3 302.567C698.462 308.661 734.159 328.544 759.956 358.632C785.754 388.72 799.955 427.033 800 466.667ZM506.9 616.667L611.767 511.8L588.2 488.233L483.333 593.1L378.467 488.233L354.9 511.8L459.767 616.667L354.9 721.533L378.467 745.1L483.333 640.233L588.2 745.1L611.767 721.533L506.9 616.667Z"
                        fill="#FF0000"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8304_23">
                        <rect width="800" height="800" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                  {inactiveUsersCount}
                </motion.span>
              </div>
            </div>

            <div className="col-activedoct">
              {users.map((user) => (
                <DoctorRow
                  key={user.id} // Assuming user has an id property
                  name={`${user.firstName} ${user.lastName}`}
                  status={user.isActive ? "Online" : "Offline"} // Assuming isActive indicates status
                  specialty={findItemById(user.positionID)} // Assuming positionId is the specialty
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
class DoctorRow extends Component {
  render() {
    return (
      <>
        <div className="doctor-row">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="changecolor-doctor"
            style={{ alignSelf: "center" }}
          >
            <TruncatedText text={this.props.specialty} maxLines={3} />
          </motion.div>

          <div className="row-inside-doct">
            <motion.img
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={doctorimg}
              className="doctor-img1"
              alt="Doctor"
            ></motion.img>
            <div className="col-doctorname-stat">
              <motion.span
                initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                animate={{ y: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                className="doctorname"
              >
                {this.props.name}
              </motion.span>
              <motion.span
                initial={{ y: 15, opacity: 0 }} // Initial position and opacity
                animate={{ y: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1.1, ease: "easeInOut" }}
                style={{
                  fontFamily: "outfitlight",
                  color: this.props.status == "Online" ? "#3bcfad" : "red",
                  fontSize: "12px",
                  paddingLeft: "10px",
                }}
              >
                {this.props.status}
              </motion.span>
            </div>
          </div>

          <div className="col-doctor-bip">
            <div style={{ height: "10px" }}></div>

            <motion.div
              initial={{ x: 10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                position: "relative",

                top: this.props.status == "Online" ? "15px" : "0px",
              }}
              className="add-patient-button1"
            >
              <motion.span
                initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  fontSize: "20px",
                  fontFamily: "outfitmed",
                  color: "white",
                  position: "relative",
                  right: "-12px",
                  alignSelf: "center",
                  paddingLeft: "5px",
                }}
              >
                {" "}
              </motion.span>{" "}
              <motion.div
                initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                className="txt-button"
              >
                <img src={bipeur} className="doctor-img"></img>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 10, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Final position and opacity
              transition={{ duration: 1, ease: "easeInOut" }}
              className="add-patient-button1"
              style={{
                visibility:
                  this.props.status == "Offline" ? "visible" : "hidden",
                backgroundColor: "red",
                boxShadow: "0px 1px 9px rgba(255, 112, 125, 0.59)",
                width: "50px",
              }}
            >
              <motion.span
                initial={{ x: 10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1.1, ease: "easeInOut" }}
                style={{
                  fontSize: "20px",
                  fontFamily: "outfitmed",
                  color: "white",
                  position: "relative",
                  right: "-12px",
                  alignSelf: "center",
                  paddingLeft: "5px",
                }}
              >
                {" "}
              </motion.span>{" "}
              <motion.div
                initial={{ x: -10, opacity: 0 }} // Initial position and opacity
                animate={{ x: 0, opacity: 1 }} // Final position and opacity
                transition={{ duration: 1, ease: "easeInOut" }}
                className="txt-button"
              >
                <img
                  src={messageicon}
                  style={{ position: "relative", left: "-10.2px", top: "1px" }}
                  className="doctor-img"
                ></img>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }
}
function TruncatedText({ text, maxLines }) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const containerHeight = textRef.current.clientHeight;
    const lineHeight = parseInt(
      window.getComputedStyle(textRef.current).lineHeight
    );
    const actualLines = Math.round(containerHeight / lineHeight);

    setIsOverflowing(actualLines > maxLines);
  }, [text, maxLines]);

  return (
    <div
      ref={textRef}
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "90px",
        marginLeft: "20px",
        height: "60px",
        fontFamily: "outfitlight",
        fontSize: "13px",
        height: "50px",
        color: "#ecececc",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        textOverflow: isOverflowing ? "ellipsis" : "unset",
      }}
    >
      {text}
    </div>
  );
}
