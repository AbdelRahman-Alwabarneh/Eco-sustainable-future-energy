import React from "react";

const Spinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#A8E6CF",
  };

  const wheelStyle = {
    position: "relative",
    border: "8px solid #A5D6A7",
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    animation: "spin 2s linear infinite",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  };

  const spokeStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "35px",
    backgroundColor: "#4CAF50",
    transformOrigin: "bottom",
    borderRadius: "2px",
  };

  const alertStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#FFF3CD",
    color: "#856404",
    border: "1px solid #FFD600",
    borderRadius: "5px",
    textAlign: "center",
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={spinnerContainerStyle}>
      <div style={wheelStyle}>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            style={{
              ...spokeStyle,
              transform: `rotate(${(index * 360) / 8}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            backgroundColor: "#388E3C",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
      <div style={alertStyle}>Loading... Please wait!</div>
    </div>
  );
};

export default Spinner;
