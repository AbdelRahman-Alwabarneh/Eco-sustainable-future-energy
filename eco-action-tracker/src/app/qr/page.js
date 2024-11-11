"use client";
import React, { useEffect, useRef, useState } from "react";
import { Camera, Upload, XCircle } from "lucide-react";
import QrScanner from "react-qr-scanner";
import jsQR from "jsqr";

const QRCodeReaderPage = () => {
  const [qrCodeMessage, setQrCodeMessage] = useState(null);
  console.log("qrCodeMessage", qrCodeMessage);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [neonPosition, setNeonPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const startScanning = () => {
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  const handleScan = (data) => {
    if (data) {
      if (typeof data === "string") {
        setQrCodeMessage(data);
      } else if (data.text) {
        setQrCodeMessage(data.text);
      }
      stopScanning();
    }
  };

  const handleError = (err) => {
    setErrorMessage("Error reading QR Code.");
    console.error(err);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setUploadedImage(imageDataUrl);

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setQrCodeMessage(code.data);
          } else {
            setErrorMessage("No QR code found in the image.");
          }
        };
        img.src = imageDataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      setNeonPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const submitData = async () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    const associatedChallenge = localStorage.getItem("challengeId");

    if (!authToken || !associatedChallenge || !qrCodeMessage) {
      setErrorMessage("Missing required data.");
      return;
    }

    // Parse the qrCodeMessage if it's a string
    let parsedQrCodeMessage;
    try {
      parsedQrCodeMessage = JSON.parse(qrCodeMessage);
    } catch (error) {
      setErrorMessage("Failed to parse QR code message.");
      return;
    }

    // Ensure the required fields exist in the parsed QR code message
    const { energyGenerated, distance, currentSpeed } = parsedQrCodeMessage;
    if (!energyGenerated || !distance || !currentSpeed) {
      setErrorMessage("Incomplete QR code data.");
      return;
    }

    const body = {
      associatedChallenge,
      energyGenerated,
      distance,
      currentSpeed,
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/energyLogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Data submitted successfully:", responseData);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMessage("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-[#2d3134] text-[#faf8ed] p-4 overflow-hidden relative pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#fdb713] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-[#faf8ed] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000 top-1/4 right-1/4"></div>
        <div className="absolute w-96 h-96 bg-[#fdb713] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 bottom-1/4 left-1/4"></div>
      </div>

      {/* Energy Shape */}
      <div
        className="absolute cursor-move"
        style={{
          width: "250px",
          height: "250px",
          left: `${neonPosition.x}%`,
          top: `${neonPosition.y}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          background:
            "radial-gradient(circle, rgba(253,183,19,0.6) 0%, rgba(253,183,19,0) 70%)",
          filter: "blur(15px)",
          animation: "pulse 2s infinite",
        }}
        onMouseDown={handleMouseDown}
      ></div>

      <div className="w-full max-w-3xl max-h-[800px] relative z-10 bg-[#faf8ed] bg-opacity-10  p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-[#fdb713]">
        <h1 className="text-3xl font-bold mb-8 text-center leading-tight tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#fdb713] to-[#faf8ed] animate-pulse">
            SCAN
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#faf8ed] to-[#fdb713] animate-pulse animation-delay-1000">
            THe QR Code on your bike
          </span>
          <span className="block text-[#fdb713] animate-pulse animation-delay-2000">
            to see your achievements!
          </span>
        </h1>

        {errorMessage && (
          <div className="bg-red-600 text-[#faf8ed] p-4 rounded-md mb-4 shadow-lg">
            <strong className="font-bold">Error:</strong> {errorMessage}
          </div>
        )}

        <div className="min-w-64 h-72 pb-4 mb-4 bg-[#2d3134] rounded-lg overflow-hidden relative">
          {scanning && (
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
          )}

          {/* Render uploaded image if available */}
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded QR Code"
              className="absolute inset-0 w-72 h-72 object-center ml-48"
            />
          )}
        </div>

        {loading && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fdb713]"></div>
          </div>
        )}

        <div className="flex space-x-4 mb-4">
          <button
            onClick={startScanning}
            className={`flex-1 px-4 py-3 bg-[#fdb713] rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#faf8ed] flex items-center justify-center text-[#2d3134] ${
              scanning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={scanning}
          >
            <Camera className="mr-2" size={20} />
            Start Scanning
          </button>
          <button
            onClick={stopScanning}
            className={`flex-1 px-4 py-3 bg-[#2d3134] border border-[#fdb713] rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fdb713] flex items-center justify-center text-[#faf8ed] ${
              !scanning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!scanning}
          >
            <XCircle className="mr-2" size={20} />
            Stop Scanning
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <label
            htmlFor="qr-upload"
            className="px-6 py-3 bg-[#fdb713] rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#faf8ed] flex items-center shadow-lg text-[#2d3134]"
          >
            <Upload className="mr-2" size={20} />
            Upload Image with QR Code
          </label>
          <input
            type="file"
            id="qr-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {qrCodeMessage && (
          <div className="mt-6 p-6 bg-[#2d3134] rounded-lg border border-[#fdb713] shadow-lg">
            <p className="text-xl font-semibold mb-3 text-[#fdb713]">
              Scanned QR Code:
            </p>
            <p className="break-words text-[#faf8ed]">{qrCodeMessage}</p>
          </div>
        )}

        <button
          onClick={submitData}
          className="mt-4 px-6 py-3 bg-[#fdb713] rounded-lg text-[#2d3134] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#faf8ed]"
        >
          Submit Data
        </button>
      </div>
    </div>
  );
};

export default QRCodeReaderPage;
