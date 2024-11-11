import React from "react";

const VideoModal = ({ showVideo, setShowVideo }) => {
  if (!showVideo) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-[#2d3134] rounded-lg shadow-lg w-full h-40 p-0">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual video URL
            title="Energy Awareness Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button
          onClick={() => setShowVideo(false)}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
