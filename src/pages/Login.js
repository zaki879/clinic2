import { Typewriter } from "react-simple-typewriter";
import secure from "../assets/iconspassword1.svg";
import React, { useState, useRef ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import phoneimg from "../assets/phonenum1.svg";
import loginimage from "../assets/loginimage.jpeg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import axios from "axios";
import "../App.css";

function LoginPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [phone, setPhone] = useState("");
  const [passw, setPassw] = useState("");
  const [errormessage, setError] = useState(false);
  const [errormessagetext, setErrortext] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const languages = ["Ar(DZ)", "Eng(US)", "Fra(FR)"];
  const [showlanguagepicker, setshowlanguagepicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOptionlang") 
  );
 
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
      if (storedOption == "Ar(DZ)") {
        i18n.changeLanguage("ar");
      } else if (storedOption == "Eng(US)") {
        i18n.changeLanguage("en");
      } else if (storedOption == "Fra(FR)") {
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
  const handleLogin = async () => {
    console.log('ok');
    try {
      const response = await axios.post(
        "https://beep-zlaa.onrender.com/api/auth/login",
        {
          email: phone,
          password: passw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then( res => {
        const { accessToken, refreshToken } = res.data;
        const{firstName,lastName} =res.data.user;
        console.log(res.data);
        navigate("/dashboard"); // Assuming you're using Reach Router or similar
        // setPassw(''); // Assuming these functions are defined in your component
        // setPhone('');
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
      }).catch(err =>{
        console.log(err);
        setErrortext('Login Failed');
        setError(true)
      } );
  
     
  
    
      
    } catch (error) {
      console.error("Login error:", error);
      setError(t("logintext13"));
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
    setError(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setPhone(event.target.value);
  };

  const handleFocus1 = () => {
    setIsFocused1(true);
    setError(false);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleChange1 = (event) => {
    setPassw(event.target.value);
  };
  const spline = useRef();

  function onLoad(splineApp) {
    // save the app in a ref for later use
    spline.current = splineApp;
  }

  return (
    <div className="container">
      <div className="containertext">
        <div className="stack2">
          <h1 style={{color:'white'}}> {t("logintext0")}</h1>
        </div>
        <div className="stack1" style={{color:'white',fontFamily:'outfitlight'}}>
          <Typewriter
            words={[t("logintext1"), t("logintext2"), t("logintext3")]}
            loop={5}
            cursor
            cursorStyle="@"
            typeSpeed={70}
            deleteSpeed={20}
            delaySpeed={1500}
          />
        </div>
      </div>

      <div className="box">
  <img src={loginimage} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
</div>

      <div className="box1">
        <div style={{ height: "30px" }}></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
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
            {selectedOption == "Ar(DZ)" ? (
              <svg
                height="800px"
                width="800px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 473.68 473.68"
              >
                <circle fill="#FFFFFF" cx="236.85" cy="236.85" r="236.83" />
                <path
                  fill="#E4E4E4"
                  d="M460.144,157.87c-0.026-0.075-0.049-0.138-0.075-0.206C429.756,72.196,351.79,9.315,258.109,0.969
	c36.248,19.872,36.401,451.774,0,471.729c93.848-8.362,171.927-71.46,202.12-157.156c0.079-0.228,0.146-0.452,0.228-0.673
	c8.526-24.438,13.219-50.682,13.219-78.026C473.678,209.139,468.88,182.573,460.144,157.87z"
                />
                <path
                  fill="#F3F4F5"
                  d="M326.413,157.87c-9.27-74.07-32.052-137.029-68.303-156.901c-6.739-0.598-13.548-0.927-20.433-0.95
	v473.636c6.885-0.03,13.694-0.359,20.433-0.957c36.401-19.954,59.227-83.359,68.423-157.829
	C332.789,264.208,332.747,208.466,326.413,157.87z"
                />
                <path
                  fill="#036535"
                  d="M236.835,0C133.807,0,46.188,65.802,13.608,157.668c-0.026,0.067-0.049,0.131-0.075,0.206
	c-8.735,24.703-13.533,51.265-13.533,78.972c0,27.348,4.693,53.588,13.219,78.026c0.079,0.221,0.15,0.445,0.228,0.673
	C45.9,407.647,133.637,473.68,236.835,473.68c0.28,0,0.557-0.022,0.845-0.022V0.019C237.393,0.011,237.115,0,236.835,0z"
                />
                <g>
                  <path
                    fill="#E61E25"
                    d="M168.378,242.078c0-48.775,39.538-88.321,88.314-88.321c16.409,0,31.775,4.499,44.931,12.292
		c-19.311-19.087-45.847-30.881-75.15-30.881c-59.044,0-106.903,47.863-106.903,106.907s47.859,106.914,106.903,106.914
		c29.303,0,55.839-11.802,75.15-30.889c-13.156,7.793-28.522,12.285-44.931,12.285C207.921,330.391,168.378,290.853,168.378,242.078
		z"
                  />
                  <polygon
                    fill="#E61E25"
                    points="304.566,185.965 303.254,227.931 342.759,242.16 302.428,253.868 301.115,295.841 
		277.507,261.112 237.182,272.828 262.915,239.639 239.314,204.917 278.835,219.146 	"
                  />
                </g>
              </svg>
            ) : selectedOption == "Eng(US)" ? (
              <svg
                height="800px"
                width="800px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 473.68 473.68"
              >
                <g>
                  <path
                    fill="#29337A"
                    d="M41.712,102.641c-15.273,22.168-26.88,47.059-33.918,73.812h107.734L41.712,102.641z"
                  />
                  <path
                    fill="#29337A"
                    d="M170.511,9.48c-27.288,7.947-52.56,20.628-74.814,37.168l74.814,74.814V9.48z"
                  />
                  <path
                    fill="#29337A"
                    d="M101.261,430.982c20.874,14.607,44.195,25.915,69.25,33.211v-102.45L101.261,430.982z"
                  />
                  <path
                    fill="#29337A"
                    d="M10.512,306.771c7.831,25.366,19.831,48.899,35.167,69.833l69.833-69.833H10.512z"
                  />
                </g>
                <g>
                  <path
                    fill="#FFFFFF"
                    d="M45.619,97.144c-1.324,1.81-2.629,3.646-3.908,5.501l73.816,73.812H7.793
		c-1.746,6.645-3.171,13.418-4.345,20.284h141.776L45.619,97.144z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M95.767,427.074c1.802,1.343,3.654,2.621,5.493,3.908l69.25-69.242v102.45
		c6.653,1.945,13.41,3.624,20.284,4.974V332.05L95.767,427.074z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M5.25,286.487c1.47,6.873,3.205,13.642,5.258,20.284h105.001l-69.833,69.833
		c7.595,10.377,16.017,20.115,25.168,29.12L190.08,286.487H5.25L5.25,286.487z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M170.511,9.48v111.982l-74.815-74.81c-10.314,7.67-19.955,16.185-28.888,25.403l123.983,123.983
		V4.506C183.921,5.864,177.164,7.547,170.511,9.48z"
                  />
                </g>
                <g>
                  <polygon
                    fill="#D32030"
                    points="170.511,306.056 169.8,306.771 170.511,306.771 	"
                  />
                  <polygon
                    fill="#D32030"
                    points="190.084,286.487 190.794,286.487 190.794,285.773 	"
                  />
                  <polygon
                    fill="#D32030"
                    points="281.229,196.737 280.545,196.737 280.545,197.425 	"
                  />
                  <polygon
                    fill="#D32030"
                    points="171.21,176.457 170.511,175.754 170.511,176.457 	"
                  />
                  <polygon
                    fill="#D32030"
                    points="190.794,196.037 190.794,196.737 191.494,196.737 	"
                  />
                </g>
                <g>
                  <path
                    fill="#252F6C"
                    d="M300.825,411.764v53.091c25.381-7.105,49.045-18.305,70.211-32.897l-57.526-57.526
		C308.913,390.583,307.231,398.933,300.825,411.764z"
                  />
                  <path
                    fill="#252F6C"
                    d="M313.812,108.471l62.799-62.799C354.05,29.15,328.456,16.559,300.824,8.818v54.538
		C308.21,78.146,308.831,89.384,313.812,108.471z"
                  />
                  <path
                    fill="#252F6C"
                    d="M427.029,377.984c15.815-21.275,28.141-45.29,36.147-71.213h-107.36L427.029,377.984z"
                  />
                  <path
                    fill="#252F6C"
                    d="M465.887,176.457c-7.188-27.318-19.143-52.676-34.898-75.192l-75.2,75.192H465.887z"
                  />
                </g>
                <g>
                  <path
                    fill="#E7E7E7"
                    d="M327.638,290.5l16.275,16.275l77.903,77.903c1.769-2.214,3.526-4.42,5.217-6.69l-71.213-71.213
		h107.36c2.046-6.638,3.784-13.41,5.25-20.284H329.16C328.932,289.367,327.911,287.643,327.638,290.5z"
                  />
                  <path
                    fill="#E7E7E7"
                    d="M311.352,120.348l70.607-70.615c-1.769-1.372-3.541-2.737-5.348-4.061l-62.799,62.799
		C314.463,110.954,310.746,117.805,311.352,120.348z"
                  />
                  <path
                    fill="#E7E7E7"
                    d="M300.825,58.992V8.814c-6.645-1.862-13.41-3.44-20.284-4.727v24.476
		C288.088,36.745,294.853,47.022,300.825,58.992z"
                  />
                  <path
                    fill="#E7E7E7"
                    d="M326.041,196.737h144.195c-1.171-6.866-2.599-13.635-4.345-20.284H355.793l75.2-75.192
		C423.6,90.7,415.384,80.768,406.409,71.565l-84.702,84.694C323.988,171.622,325.009,180.544,326.041,196.737z"
                  />
                  <path
                    fill="#E7E7E7"
                    d="M310.088,371.002l60.952,60.959c10.138-6.982,19.685-14.753,28.593-23.189l-80.173-80.177
		C316.901,343.423,313.865,357.745,310.088,371.002z"
                  />
                  <path
                    fill="#E7E7E7"
                    d="M280.545,442.301v27.28c6.873-1.279,13.635-2.865,20.284-4.727v-53.091
		C294.853,423.738,288.088,434.13,280.545,442.301z"
                  />
                </g>
                <path
                  fill="#D71F28"
                  d="M321.707,156.259l84.694-84.694c-7.625-7.831-15.8-15.119-24.446-21.832l-66.55,66.561
	C318.363,128.657,319.706,142.808,321.707,156.259z"
                />
                <g>
                  <path
                    fill="#D32030"
                    d="M225.019,0.292C228.965,0.101,232.899,0,236.836,0C232.876,0,228.935,0.101,225.019,0.292z"
                  />
                  <path
                    fill="#D32030"
                    d="M236.836,473.68c-3.938,0-7.872-0.108-11.81-0.299C228.942,473.579,232.876,473.68,236.836,473.68z"
                  />
                  <path
                    fill="#D32030"
                    d="M236.836,473.68c14.943,0,29.535-1.447,43.708-4.099v-27.28
		C268.103,455.786,253.549,473.68,236.836,473.68z"
                  />
                </g>
                <g>
                  <path
                    fill="#D71F28"
                    d="M470.232,196.737H327.911c1.885,29.704,1.657,60.249-0.681,89.75h141.2
		c3.418-16.017,5.25-32.613,5.25-49.643C473.68,223.164,472.461,209.784,470.232,196.737z"
                  />
                  <path
                    fill="#D71F28"
                    d="M327.638,290.5c-1.316,13.994-5.901,24.898-8.182,38.099l80.173,80.173
		c7.932-7.517,15.347-15.557,22.183-24.094l-77.9-77.907L327.638,290.5z"
                  />
                </g>
                <path
                  fill="#D32030"
                  d="M280.545,30.324V4.091C266.376,1.447,251.784,0,236.836,0C253.549,0,268.103,16.843,280.545,30.324z"
                />
                <g>
                  <path
                    fill="#29337A"
                    d="M300.825,422.007c6.406-12.834,11.899-27.609,16.499-43.757l-16.499-16.499V422.007z"
                  />
                  <path
                    fill="#29337A"
                    d="M319.377,102.906c-4.989-19.087-11.166-36.439-18.552-51.229v69.773L319.377,102.906z"
                  />
                </g>
                <g>
                  <path
                    fill="#FFFFFF"
                    d="M332.234,295.092c0.269-2.857,0.512-5.725,0.744-8.605h-9.349L332.234,295.092z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M300.825,121.451V51.674c-5.976-11.97-12.737-22.254-20.284-30.429v129.906l40.735-40.735
		c-0.613-2.543-1.257-5.034-1.9-7.517L300.825,121.451z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M281.229,196.737h52.429c-1.028-16.192-2.666-32.123-4.944-47.482L281.229,196.737z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M280.545,452.432c7.547-8.182,14.308-18.459,20.284-30.429v-60.256l16.499,16.499
		c3.784-13.264,6.959-27.434,9.525-42.261l-46.307-46.304L280.545,452.432L280.545,452.432z"
                  />
                </g>
                <path
                  fill="#E51D35"
                  d="M280.545,452.432V289.681l46.304,46.307c2.277-13.205,4.069-26.899,5.381-40.896l-8.605-8.605h9.349
	c2.337-29.502,2.565-60.047,0.681-89.75h-52.429l47.482-47.482c-2.001-13.455-4.476-26.469-7.434-38.836l-40.728,40.735V21.248
	C268.103,7.763,253.549,0,236.836,0c-3.938,0-7.872,0.101-11.817,0.292c-11.649,0.583-23.073,2.016-34.225,4.215v191.531
	L66.808,72.055c-7.618,7.861-14.704,16.237-21.189,25.089l79.313,79.313l20.291,20.284H3.448C1.227,209.784,0,223.164,0,236.844
	c0,17.034,1.84,33.626,5.25,49.643h184.834L70.847,405.724c7.808,7.67,16.121,14.813,24.921,21.349l95.023-95.023v137.116
	c11.151,2.199,22.583,3.631,34.232,4.215c3.938,0.191,7.872,0.299,11.81,0.299C253.549,473.68,268.103,465.917,280.545,452.432z"
                />
              </svg>
            ) : (
              <svg
                height="800px"
                width="800px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 473.684 473.684"
              >
                <path
                  fill="#E61E25"
                  d="M315.802,13.535l-27.639,76.632c25.512,84.193,25.512,209.156,0,293.353l27.639,76.624
	c91.975-32.523,157.882-120.195,157.882-223.31C473.684,133.735,407.777,46.059,315.802,13.535z"
                />
                <g>
                  <path
                    fill="#E4E4E4"
                    d="M315.802,90.167V13.535C291.102,4.8,264.536,0.002,236.84,0.002
		C273.361,0.002,222.723,123.775,315.802,90.167z"
                  />
                  <path
                    fill="#E4E4E4"
                    d="M236.84,473.682c27.695,0,54.262-4.798,78.962-13.534v-76.624
		C223.658,374.328,236.84,473.682,236.84,473.682z"
                  />
                </g>
                <path
                  fill="#3757A6"
                  d="M0,236.837C0,340.297,66.355,428.2,158.806,460.461V13.229C66.355,45.49,0,133.393,0,236.837z"
                />
                <path
                  fill="#EF4F4E"
                  d="M315.802,90.167V383.52C341.317,299.323,341.317,174.359,315.802,90.167z"
                />
                <path
                  fill="#F3F4F5"
                  d="M315.802,383.523V90.167C299.677,36.938,273.361,0.002,236.84,0.002
	c-27.351,0-53.592,4.697-78.034,13.227v447.234c24.442,8.53,50.683,13.22,78.034,13.22
	C273.361,473.682,299.677,436.746,315.802,383.523z"
                />
              </svg>
            )}
            <div className="languagetext">{selectedOption}</div>
          </div>
          {showlanguagepicker && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "absolute",
                left: "13%",
                zIndex: "2",
                top: "10%",
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  height: "100px",
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
                  {languages.map((specialty, index) => (
                    <li
                      key={index}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "3px",
                        fontFamily: "outfitmed",
                        fontSize: "14px",
                        transition: "background-color 0.3s",
                        backgroundColor:
                          selectedOption == specialty
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
          <div className="logo" style={{ userSelect: "none" }}>
            <svg
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
                sstrokeMiterlimit="10"
              />
              <path
                d="M21.0003 26.5414C21.892 27.8834 23.7172 28.2538 25.0858 27.349L28.0718 25.3748C30.8835 23.5158 34.6571 24.2816 36.4802 27.0812L31.0059 30.7006C29.6 31.6301 27.9475 31.9075 26.4299 31.5995C24.9123 31.2915 23.5091 30.394 22.5975 28.9942L21.0245 26.5785C21.0164 26.5661 19.5 23.0149 21.0003 26.5414Z"
                fill="url(#paint2_linear_8121_104)"
                stroke="white"
                strokeWidth="2"
                sstrokeMiterlimit="10"
              />
              <path
                d="M20.0881 24.7039L18.0965 22.6971C16.9434 21.5352 16.9329 19.6657 18.0755 18.4932C19.2076 17.3736 21.0106 17.3948 22.1322 18.5249C22.6983 19.0953 22.9813 19.8452 22.9813 20.5846C22.9813 21.324 22.6983 22.0739 22.1322 22.6443L21.6605 23.1196"
                fill="url(#paint3_linear_8121_104)"
              />
              <path
                d="M20.0881 24.7039L18.0965 22.6971C16.9434 21.5352 16.9329 19.6657 18.0755 18.4932C19.2076 17.3736 21.0106 17.3948 22.1322 18.5249C22.6983 19.0953 22.9813 19.8452 22.9813 20.5846C22.9813 21.324 22.6983 22.0739 22.1322 22.6443L21.6605 23.1196"
                stroke="white"
                strokeWidth="2"
                sstrokeMiterlimit="10"
              />
              <path
                d="M37.91 32.8728C39.0421 31.711 39.0421 29.8309 37.8891 28.669L35.3733 26.1341C33.0043 23.747 33.0043 19.86 35.3733 17.4729L39.9856 22.1204C41.1701 23.3139 41.7676 24.8877 41.7676 26.4509C41.7676 28.0142 41.1701 29.588 39.9856 30.7815L37.9415 32.8412C37.9205 32.8623 37.91 32.8728 37.91 32.8728Z"
                fill="url(#paint4_linear_8121_104)"
                stroke="white"
                strokeWidth="2"
                sstrokeMiterlimit="10"
              />
              <path
                d="M38.0881 31.5797L40.0798 33.5866C41.2329 34.7484 41.2433 36.618 40.1008 37.7904C38.9687 38.91 37.1657 38.8889 36.0441 37.7587C35.478 37.1883 35.195 36.4384 35.195 35.699C35.195 34.9597 35.478 34.2097 36.0441 33.6394L36.5263 33.1535"
                fill="url(#paint5_linear_8121_104)"
              />
              <path
                d="M38.0881 31.5797L40.0798 33.5866C41.2329 34.7484 41.2433 36.618 40.1008 37.7904C38.9687 38.91 37.1657 38.8889 36.0441 37.7587C35.478 37.1883 35.195 36.4384 35.195 35.699C35.195 34.9597 35.478 34.2097 36.0441 33.6394L36.5263 33.1535"
                stroke="white"
                strokeWidth="2"
                sstrokeMiterlimit="10"
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
            </svg>
            <p className="logotext">{t("logintext4")}</p>
          </div>
        </div>

        <div className="container2page" onClick={handleClickfilterfalse}>
          <div className="Logintext">
            <p className="textlogin">{t("logintext5")}</p>
            <p className="welcome">{t("logintext6")}</p>
            <p className="welcome1">{t("logintext7")}</p>
          </div>
          <div className="inputfields">
            <div className="input-container">
              <label
                className={
                  isFocused && !phone
                    ? "floating-label"
                    : isFocused || phone
                    ? "floating-label1"
                    : "normalstate"
                }
              >
                {t("logintext8")}
              </label>
              <div className="row">
                <img
                  src={phoneimg}
                  className="iconofbox"
                  style={{ height: "25px", width: "auto" }}
                ></img>

                <input
                  type="text"
                  placeholder={isFocused || phone ? "" : t("logintext9")}
                  className="custom-input"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={phone}
                />
              </div>
            </div>
            <div style={{ height: "50px" }}></div>
            <div className="input-container">
              <label
                className={
                  isFocused1 && !passw
                    ? "floating-label"
                    : isFocused1 || passw
                    ? "floating-label1"
                    : "normalstate"
                }
              >
                {t("logintext10")}
              </label>
              <div
                style={{
                  width:
                    selectedOption == "Eng(US)"
                      ? "27px"
                      : selectedOption == "Ar(DZ)"
                      ? "4px"
                      : "55px",
                }}
              ></div>
              <div className="row">
                <img src={secure} className="iconofbox"></img>
                <input
                  type="password"
                  placeholder={isFocused1 || passw ? "" : t("logintext11")}
                  className="custom-input"
                  onFocus={handleFocus1}
                  onBlur={handleBlur1}
                  onChange={handleChange1}
                  value={passw}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button className="custom-button" onClick={handleLogin}>
              {t("logintext12")}
            </button>
          </div>
          {errormessage && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                fontFamily: "outfitlight",
                color: "red",
                fontSize: "14px",
                position: "absolute",
                bottom: "5%",
                right: "45%",
              }}
            >
              {errormessagetext}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
