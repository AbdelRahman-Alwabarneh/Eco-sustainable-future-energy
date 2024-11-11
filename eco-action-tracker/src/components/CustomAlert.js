"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

const CustomAlert = () => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  let hideTimeout = null;

  const showAlert = (msg) => {
    setMessage(msg);
    setVisible(true);

    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const hideAlert = () => {
    setVisible(false);
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
  };

  const fetchReminder = async () => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      const response = await fetch("http://localhost:3000/api/reminder", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        showAlert(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch reminder:", error);
    }
  };

  useEffect(() => {
    fetchReminder();
    const intervalId = setInterval(fetchReminder, 500000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`fixed top-24 right-5 w-80 transition-all duration-300 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 relative">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-blue-700 font-semibold text-sm">Reminder</h3>
            <p className="text-blue-600 mt-1 text-sm">{message}</p>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={hideAlert}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
