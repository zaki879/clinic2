import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const ToggleButtons = ({ userId }) => {
  const [isOn, setIsOn] = useState(false); // Initialize isOn state
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [userIsActive, setUserIsActive] = useState(false); // State to store user's isActive status

  useEffect(() => {
    setRefreshToken(localStorage.getItem('refreshToken'));
    setAccessToken(localStorage.getItem('accessToken'));

    const fetchUserStatus = async () => {
      try {
        // Refresh access token
        const refreshTokenResponse = await axios.post(
          'https://beep-zlaa.onrender.com/api/auth/refresh-token',
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = refreshTokenResponse.data;
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);

        // Fetch user data including isActive status
        const userResponse = await axios.get(
          `https://beep-zlaa.onrender.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserIsActive(userResponse.data.isActive); // Set user's isActive status to state
        setIsOn(userResponse.data.isActive); // Initialize isOn state with isActive status
      } catch (error) {
        console.error('Failed to fetch user status:', error);
      }
    };

    fetchUserStatus();
  }, [userId, refreshToken]); // Dependency array includes userId and refreshToken

  const handleToggle = async () => {
    setIsOn(!isOn); // Toggle the isOn state

    try {
      // Refresh access token
      const refreshTokenResponse = await axios.post(
        'https://beep-zlaa.onrender.com/api/auth/refresh-token',
        {
          refreshToken: refreshToken,
        }
      );
      const { accessToken } = refreshTokenResponse.data;
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);

      // Update user isActive status using the user id
      await axios.put(
        `https://beep-zlaa.onrender.com/api/users/${userId}`,
        {
          isActive: !isOn, // Toggle isActive status
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success(`User toggled successfully`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
        progressBar: {
          height: '2px',
        },
      });
    } catch (error) {
      console.error('Failed to toggle user:', error);
      const errorMessage = error.response?.data?.error?.message || 'Unknown error';
      toast.error(`Failed to toggle user: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
        progressBar: {
          height: '2px',
        },
      });
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <button
      onClick={handleToggle}
      style={{
        padding: '10px 10px',
        marginTop:'7px',
        fontSize: '12px',
        backgroundColor: isOn ? '#3BCFAD' : '#ff0000',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
      }}
    >
      {isOn ?     t("logintex73"):     t("logintex74")}
    </button>
  );
};

export default ToggleButtons;
