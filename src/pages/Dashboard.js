import React, { useState } from "react";
import logo from "../assets/blob 1.png";
import userprofile from "../assets/17 1.png";
import Dash from "./Dash";
import MessagesPage from "./Message";
import schedule from "./Appoint";
import Doctor from "./Doctor";
import Statistic from "../components/Donutchart";
import Note from "./Note";
import Schedule from "./Appoint";
import { motion } from "framer-motion";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("dash");
  const [isMessage, setIsMessage] = useState(true);
  const [isDash, setIsDash] = useState(false);
  const [isNote, setIsNote] = useState(true);
  const [isDoctor, setIsDoctor] = useState(true);
  const [isStatistics, setIsStatistics] = useState(true);
  const [isschedule, setIsschedule] = useState(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);

    if (item === "dash") {
      setIsDash(false);
      setIsMessage(true);
      setIsNote(true);
      setIsDoctor(true);
      setIsStatistics(true);
      setIsschedule(true);
    } else if (item === "message") {
      setIsDash(true);
      setIsMessage(false);
      setIsNote(true);
      setIsDoctor(true);
      setIsStatistics(true);
      setIsschedule(true);
    } else if (item === "note") {
      setIsDash(true);
      setIsMessage(true);
      setIsNote(false);
      setIsDoctor(true);
      setIsschedule(true);
      setIsStatistics(true);
    } else if (item === "doctor") {
      setIsDash(true);
      setIsMessage(true);
      setIsNote(true);
      setIsDoctor(false);
      setIsStatistics(true);
      setIsschedule(true);
    } else if (item === "statistics") {
      setIsDash(true);
      setIsMessage(true);
      setIsNote(true);
      setIsDoctor(true);
      setIsStatistics(false);
      setIsschedule(true);
    } else if (item === "schedule") {
      setIsDash(true);
      setIsMessage(true);
      setIsNote(true);
      setIsDoctor(true);
      setIsStatistics(true);
      setIsschedule(false);
    }
  };

  // You can also handle color toggle separately
  const handleColorToggleMessage = () => {
    setIsDash(false);
    setIsMessage(true);
    setIsNote(false);
    setIsStatistics(false);
  };

  return (
    <div className="bigcontainer">
      <div className="sidebarrow">
        <div className="logoandtext">
        
          <motion.svg
          initial={{ y: -10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
            className="logodash"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              rx="8"
              fill="url(#paint0_linear_8121_104)"
            />
            <path
              d="M20.3733 23.5186C19.2412 24.6805 19.2412 26.5606 20.3943 27.7225L22.91 30.2574C25.2791 32.6445 25.2791 36.5315 22.91 38.9186L18.2978 34.2711C17.1133 33.0776 16.5158 31.5038 16.5158 29.9406C16.5158 28.3773 17.1133 26.8035 18.2978 25.61L20.3419 23.5503C20.3523 23.5398 20.3628 23.5292 20.3733 23.5186Z"
              fill="url(#paint1_linear_8121_104)"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M21.0003 26.5414C21.892 27.8834 23.7172 28.2538 25.0858 27.349L28.0718 25.3748C30.8835 23.5158 34.6571 24.2816 36.4802 27.0812L31.0059 30.7006C29.6 31.6301 27.9475 31.9075 26.4299 31.5995C24.9123 31.2915 23.5091 30.394 22.5975 28.9942L21.0245 26.5785C21.0164 26.5661 19.5 23.0149 21.0003 26.5414Z"
              fill="url(#paint2_linear_8121_104)"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M20.0881 24.7039L18.0965 22.6971C16.9434 21.5352 16.9329 19.6657 18.0755 18.4932C19.2076 17.3736 21.0106 17.3948 22.1322 18.5249C22.6983 19.0953 22.9813 19.8452 22.9813 20.5846C22.9813 21.324 22.6983 22.0739 22.1322 22.6443L21.6605 23.1196"
              fill="url(#paint3_linear_8121_104)"
            />
            <path
              d="M20.0881 24.7039L18.0965 22.6971C16.9434 21.5352 16.9329 19.6657 18.0755 18.4932C19.2076 17.3736 21.0106 17.3948 22.1322 18.5249C22.6983 19.0953 22.9813 19.8452 22.9813 20.5846C22.9813 21.324 22.6983 22.0739 22.1322 22.6443L21.6605 23.1196"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M37.91 32.8728C39.0421 31.711 39.0421 29.8309 37.8891 28.669L35.3733 26.1341C33.0043 23.747 33.0043 19.86 35.3733 17.4729L39.9856 22.1204C41.1701 23.3139 41.7676 24.8877 41.7676 26.4509C41.7676 28.0142 41.1701 29.588 39.9856 30.7815L37.9415 32.8412C37.9205 32.8623 37.91 32.8728 37.91 32.8728Z"
              fill="url(#paint4_linear_8121_104)"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M38.0881 31.5797L40.0798 33.5866C41.2329 34.7484 41.2433 36.618 40.1008 37.7904C38.9687 38.91 37.1657 38.8889 36.0441 37.7587C35.478 37.1883 35.195 36.4384 35.195 35.699C35.195 34.9597 35.478 34.2097 36.0441 33.6394L36.5263 33.1535"
              fill="url(#paint5_linear_8121_104)"
            />
            <path
              d="M38.0881 31.5797L40.0798 33.5866C41.2329 34.7484 41.2433 36.618 40.1008 37.7904C38.9687 38.91 37.1657 38.8889 36.0441 37.7587C35.478 37.1883 35.195 36.4384 35.195 35.699C35.195 34.9597 35.478 34.2097 36.0441 33.6394L36.5263 33.1535"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_8121_104"
                x1="50.5"
                y1="-5"
                x2="9"
                y2="49"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_8121_104"
                x1="18.9518"
                y1="23.3478"
                x2="18.4726"
                y2="36.6071"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_8121_104"
                x1="19.7174"
                y1="26.6456"
                x2="33.8343"
                y2="28.9286"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_8121_104"
                x1="19.3216"
                y1="16.5021"
                x2="20.2479"
                y2="23.5252"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_8121_104"
                x1="33.9518"
                y1="17.302"
                x2="33.4726"
                y2="30.5613"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_8121_104"
                x1="37.3216"
                y1="31.6165"
                x2="38.2479"
                y2="38.6396"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A1DF7" />
                <stop offset="1" stopColor="#2E00E6" />
              </linearGradient>
            </defs>
          </motion.svg>

          <span >ADMIN</span>
        </div>
        <div style={{height:"10%"}}></div>
        <div className="item">
          <div className="itemwithsolid">
            <div className="tooltip">
            <motion.svg
          initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
                fill="#6d00fc"
                width="20px"
                height="20px"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                id={isDash ? "doctornotselected" : "doctor"}
                className={isDash ? "dash blue" : "dash"}
                onClick={() => handleItemClick("dash")}
              >
                <mask
                  id="mask0_8121_67"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                >
                  <rect width="32" height="32" fill="white" />
                </mask>
                <g mask="url(#mask0_8121_67)">
                  <path
                    d="M13.6704 7.84579L14.0416 13.3657L14.2258 16.1401C14.2278 16.4255 14.2725 16.7089 14.3588 16.9813C14.5813 17.5101 15.1168 17.8461 15.6993 17.8227L24.5756 17.242C24.96 17.2357 25.3312 17.3795 25.6074 17.6417C25.8377 17.8603 25.9864 18.1461 26.0333 18.4536L26.049 18.6403C25.6817 23.7265 21.9461 27.9689 16.8704 29.064C11.7946 30.1591 6.58965 27.8457 4.08145 23.3799C3.35836 22.0824 2.90671 20.6564 2.75301 19.1853C2.68881 18.7499 2.66055 18.31 2.66848 17.87C2.66055 12.417 6.5438 7.70262 11.9796 6.5661C12.6339 6.46422 13.2752 6.81057 13.5376 7.40738C13.6054 7.54559 13.6502 7.69362 13.6704 7.84579Z"
                    fill="#737791"
                  />
                  <path
                    opacity="0.4"
                    d="M29.3335 13.083L29.3242 13.1264L29.2973 13.1896L29.301 13.3631C29.2871 13.5929 29.1983 13.8139 29.0455 13.9926C28.8862 14.1786 28.6686 14.3053 28.429 14.3545L28.2829 14.3745L18.0418 15.0381C17.7011 15.0717 17.3619 14.9618 17.1087 14.7359C16.8975 14.5475 16.7626 14.2934 16.7245 14.0195L16.0371 3.79334C16.0251 3.75877 16.0251 3.72129 16.0371 3.6867C16.0465 3.40482 16.1706 3.13838 16.3817 2.9469C16.5926 2.75542 16.8731 2.65486 17.1602 2.66769C23.2401 2.82237 28.3499 7.19431 29.3335 13.083Z"
                    fill="#737791"
                  />
                </g>
              </motion.svg>

              <span className="tooltiptext">Dashboard</span>
            </div>
          </div>

          <div className="itemwithsolid">
            <div className="tooltip">
            <motion.svg
          initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
                fill="none"
                width="20px"
                height="20px"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                id="note"
                className={isStatistics ? "dash blue" : "dash"}
                onClick={() => handleItemClick("statistics")}
              >
                <path
                  d="M4 17.926C4 17.1896 4.59695 16.5927 5.33333 16.5927V16.5927C6.06971 16.5927 6.66667 17.1896 6.66667 17.926V27.3509C6.66667 28.0873 6.06971 28.6842 5.33333 28.6842V28.6842C4.59695 28.6842 4 28.0873 4 27.3509V17.926ZM25.3333 12.552C25.3333 11.8156 25.9303 11.2187 26.6667 11.2187V11.2187C27.403 11.2187 28 11.8156 28 12.552V27.3509C28 28.0873 27.403 28.6842 26.6667 28.6842V28.6842C25.9303 28.6842 25.3333 28.0873 25.3333 27.3509V12.552ZM14.6667 4.49099C14.6667 3.75461 15.2636 3.15765 16 3.15765V3.15765C16.7364 3.15765 17.3333 3.75461 17.3333 4.49099V27.3509C17.3333 28.0873 16.7364 28.6842 16 28.6842V28.6842C15.2636 28.6842 14.6667 28.0873 14.6667 27.3509V4.49099Z"
                  fill="#737791"
                />
              </motion.svg>

              <span className="tooltiptext">Statistic</span>
            </div>
          </div>
          <div className="itemwithsolid">
            <div className="tooltip">
            <motion.svg
          initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
                fill="none"
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                id={isMessage ? "messagenotselected" : "messageselected"}
                className={isMessage ? "message blue" : "message"}
                onClick={() => handleItemClick("message")}
              >
                <path
                  d="M24 0.187637H2.66667C1.2 0.187637 0 1.39679 0 2.87464V27.0577L5.33333 21.6837H24C25.4667 21.6837 26.6667 20.4745 26.6667 18.9967V2.87464C26.6667 1.39679 25.4667 0.187637 24 0.187637ZM24 18.9967H4.26667L2.66667 20.6089V2.87464H24V18.9967ZM20 12.2792H17.3333V9.59216H20V12.2792ZM14.6667 12.2792H12V9.59216H14.6667V12.2792ZM9.33333 12.2792H6.66667V9.59216H9.33333"
                  fill="#737791"
                />
              </motion.svg>

              <span className="tooltiptext">Messages</span>
            </div>
          </div>
          <div className="itemwithsolid">
            <div className="tooltip">
            <motion.svg
          initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
                fill="none"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                id={isDoctor ? "doctornotselected" : "doctor"}
                className={isDoctor ? "doctor blue" : "doctor"}
                onClick={() => handleItemClick("doctor")}
              >
                <g>
                  <g id="doctor">
                    <g>
                      <path
                        d="M147.937,344.352c-7.859,0-14.228,6.375-14.228,14.229c0,7.855,6.368,14.229,14.228,14.229
				c7.857,0,14.225-6.373,14.225-14.229C162.161,350.727,155.794,344.352,147.937,344.352z"
                      />
                      <path
                        d="M373.898,332.414c-16.762-6.044-30.195-12.256-41.078-19.016c-1.912-1.28-2.59-1.438-4.26-2.358
				c-6.137-3.383-12.02-0.59-13.711,1.563c-0.467,0.594-0.943,1.186-1.43,1.775c-12.75,14.913-54.729,32.975-54.744,32.979
				c-3.285,0.898-5.703,3.896-5.703,7.468c0,0.006,0,0.013,0,0.013l-0.002,0.008l0.146,51.587c0,31.793-25.656,57.656-57.157,57.656
				c-31.563,0-57.242-25.863-57.242-57.656v-21.589c-10.882-3.775-18.706-14.092-18.706-26.263
				c0-15.366,12.457-27.825,27.825-27.825c15.365,0,27.823,12.459,27.823,27.825c0,11.903-7.489,22.034-18.003,26.008v20.877
				c0,22.528,17.158,40.875,38.281,40.875c21.088,0,38.268-18.347,38.268-40.875l0.099-50.294l0.001-0.014
				c0-0.005-0.001-0.009-0.001-0.014l0.001-0.325c0,0-0.011-0.025-0.02-0.048c-0.159-3.213-2.543-5.594-5.171-6.922
				c-0.033-0.017-44.73-22.312-57.838-38.996c-1.691-2.152-7.573-4.945-13.71-1.563c-11.44,6.306-26.995,11.507-46.654,18.597
				c-60.62,21.854-78.094,44.147-78.094,59.353c0,15.179,0,99.575,0,99.575h209.436h0.305h209.437c0,0,0-84.396,0-99.575
				C451.994,370.035,434.523,354.268,373.898,332.414z"
                      />
                      <path
                        d="M143.533,146.218c3.119,40.98,19.417,23.318,22.778,41.27c6.613,35.324,20.119,36.678,24.861,48.836
				c1.064,2.734,1.689,15.803,1.689,20.143c0,14.541-0.796,22.244-6.487,29.627c-1.292,1.676-3.469,7.148-0.686,11.299
				c12.588,18.771,36.885,34.552,59.717,34.845c22.832-0.293,47.128-16.072,59.718-34.845c2.781-4.149,0.604-9.622-0.688-11.299
				c-5.689-7.383-6.488-15.086-6.488-29.627c0-4.34,0.625-17.408,1.689-20.143c4.742-12.158,18.248-13.512,24.861-48.836
				c3.361-17.951,19.66-0.289,22.779-41.27c0-16.332-8.898-20.393-8.898-20.393s4.523-24.17,6.295-42.768
				C346.869,59.875,331.143,0,247.264,0c-0.305,0-1.319,0-1.858,0c-0.541,0-1.556,0-1.861,0c-83.877,0-99.605,59.875-97.41,83.057
				c1.772,18.598,6.295,42.768,6.295,42.768S143.533,129.886,143.533,146.218z"
                      />
                    </g>
                  </g>
                </g>
              </motion.svg>
              <span className="tooltiptext">Doctors</span>
            </div>
          </div>

          <div className="itemwithsolid">
            <div className="tooltip">
            <motion.svg
          initial={{ y: -10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
                width="23"
                height="23"
                viewBox="0 0 32 32"
                fill="none"
                id="schedule"
                xmlns="http://www.w3.org/2000/svg"
                className={isschedule ? "dash blue" : "dash"}
                onClick={() => handleItemClick("schedule")}
              >
                <path
                  d="M26.86 5.81H25.466V2.905H22.61V5.81H11.322V2.905H8.5V5.81H7.072C6.30133 5.81 5.63833 6.09583 5.083 6.6675C4.52767 7.23917 4.25 7.93333 4.25 8.75V29.12C4.25 29.9133 4.522 30.5958 5.066 31.1675C5.61 31.7392 6.27867 32.025 7.072 32.025H26.86C27.6533 32.025 28.322 31.7392 28.866 31.1675C29.41 30.5958 29.682 29.9133 29.682 29.12V8.75C29.682 7.93333 29.4043 7.23917 28.849 6.6675C28.2937 6.09583 27.6307 5.81 26.86 5.81ZM26.86 29.12H7.072V13.09H26.86V29.12ZM9.894 15.995H16.966V23.275H9.894V15.995Z"
                  fill="#737791"
                />
              </motion.svg>

              <span className="tooltiptext">Schedule</span>
            </div>
          </div>
        </div>
        <div className="item1">
          <div className="bellrow1">
          <motion.svg
          initial={{ y: -10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
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
            </motion.svg>
            <div className="notificationmark"></div>
          </div>
          <img className="userprofileicon1" src={userprofile}></img>

          <motion.svg
          initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }} 
            className="signouticon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.7747 22.2011L26.3371 16.8777C26.555 16.6292 26.6665 16.3154 26.6666 16C26.6667 15.7842 26.6147 15.5676 26.5091 15.3706C26.4621 15.2828 26.4047 15.1994 26.3371 15.1223L21.7747 9.79894C21.2955 9.23982 20.4538 9.17502 19.8947 9.65422C19.3356 10.1334 19.2708 10.9751 19.75 11.5343L22.4345 14.6666L12.1083 14.6666C11.3719 14.6666 10.775 15.2636 10.775 15.9999C10.775 16.7363 11.3719 17.3333 12.1083 17.3333L22.4347 17.3333L19.75 20.4658C19.2708 21.0249 19.3356 21.8666 19.8947 22.3458C20.4538 22.825 21.2955 22.7602 21.7747 22.2011ZM13.3333 7.99992C14.0697 7.99992 14.6666 8.59687 14.6666 9.33325L14.6666 11.3333C14.6666 12.0696 15.2636 12.6666 16 12.6666C16.7363 12.6666 17.3333 12.0696 17.3333 11.3333L17.3333 9.33325C17.3333 7.12411 15.5424 5.33325 13.3333 5.33325L9.33329 5.33325C7.12415 5.33325 5.33329 7.12411 5.33329 9.33325L5.33329 22.6666C5.33329 24.8757 7.12415 26.6666 9.33329 26.6666L13.3333 26.6666C15.5424 26.6666 17.3333 24.8757 17.3333 22.6666L17.3333 20.6666C17.3333 19.9302 16.7363 19.3333 16 19.3333C15.2636 19.3333 14.6666 19.9302 14.6666 20.6666L14.6666 22.6666C14.6666 23.403 14.0697 23.9999 13.3333 23.9999L9.33329 23.9999C8.59691 23.9999 7.99996 23.403 7.99996 22.6666L7.99996 9.33325C7.99996 8.59687 8.59691 7.99992 9.33329 7.99992L13.3333 7.99992Z"
              fill="#737791"
            />
          </motion.svg>
          <motion.span  initial={{ y: 10, opacity: 0 }} // Initial position and opacity
                      animate={{ y: 0, opacity: 1 }} // Final position and opacity
                      transition={{ duration: 0.5, ease: "easeInOut" }}  className="signouttext">Sign Out</motion.span>
        </div>
      </div>
      <div className="principlecontent">
        {selectedItem === "dash" && <Dash />}
        {selectedItem === "message" && <MessagesPage />}
        {selectedItem === "note" && <Note />}
        {selectedItem === "statistics" && <Statistic />}
        {selectedItem === "doctor" && <Doctor />}
        {selectedItem === "schedule" && <Schedule />}
      </div>
    </div>
  );
}

export default Dashboard;
