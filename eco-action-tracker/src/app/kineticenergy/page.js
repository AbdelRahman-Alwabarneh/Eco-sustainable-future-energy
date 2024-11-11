"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";

const BikeModel = dynamic(() => import("../../components/BikeModel"), {
  ssr: false,
});

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const toastTimer = setTimeout(() => {
        toast.info("Welcome! Explore the bike to see how you can move it.", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });

        toast.info(
          "To activate your bike and start your journey, click on it!",
          {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          }
        );
      }, 3000);

      return () => clearTimeout(toastTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const navigateToKineticEnergyQR = () => {
    router.push("/kineticenergy1");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#A8E6CF",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BikeModel onClick={navigateToKineticEnergyQR} />{" "}
      </div>
    </div>
  );
};

export default HomePage;
