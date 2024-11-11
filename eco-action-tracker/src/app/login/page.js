"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Wind, Sun, AlertTriangle, Eye, EyeOff,X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2';
import GoogleButton from "@/components/GoogleButton";

function LogIn() {
  const [ValidationEmail, setValidationEmail] = useState("");
  const [ValidationPassword, setValidationPassword] = useState("");
  const [EmailMessage, setEmailMessage] = useState("hidden");
  const [PasswordMessage, setPasswordMessage] = useState("hidden");
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
    ValidationEmail
  );

  useEffect(() => {
    setEmailMessage(Email_Message ? "block" : "hidden");
  }, [ValidationEmail]);

  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }

  async function sub() {
    if (ValidationEmail === "" || Email_Message) {
        setEmailMessage("block");
        return;
    }
    if (ValidationPassword === "") {
        setPasswordMessage("block");
        return;
    }
    setIsLoading(true);
    try {
        const response = await axios.post("http://localhost:3000/api/login", {
            email: ValidationEmail,
            password: ValidationPassword,
        });
        console.log("Attempting login...");

        // Show success message
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Logged in successfully!",
            timer: 1500, // Set timer to 1500 ms (1.5 seconds)
            timerProgressBar: true, // Optional: show progress bar
            showConfirmButton: false, // Hide confirm button
        }).then(() => {
          if (response.data.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        });

    } catch (error) {
        console.error("Login error:", error);

        // Retrieve error message from backend response
        const errorMessage = error.response?.data?.message || "An error occurred";

        // Show error message with OK button
        Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            confirmButtonText: "OK", // Show OK button
        });
    } finally {
        setIsLoading(false);
    }
}
  return (
    <div className="min-h-screen bg-[#2D3134] flex items-center justify-center p-4">
      <div className="bg-[#FAF8ED] rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 relative">
        <div className="flex justify-center mb-6">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-[#2D3134] hover:text-[#fdb713] transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>
        <Link href="/"><Wind className="text-[#fdb713] w-12 h-12 mr-2" /></Link>
        <Link href="/"><Sun className="text-[#fdb713] w-12 h-12" /></Link>
        </div>
        <h1 className="text-3xl font-bold text-center text-[#2D3134] mb-6">
          Welcome Back
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sub();
          }}
          className="space-y-4 text-[#2D3134]"
        >
          <div>
            <label htmlFor="Email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              onChange={(e) => setValidationEmail(e.target.value)}
              type="email"
              id="Email"
              className="w-full px-3 py-2 bg-[#FDFEFF] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
              placeholder="Enter your email"
            />
            <p className={`${EmailMessage} mt-2 text-sm text-[#fdb713]`}>
              Invalid email address
            </p>
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setValidationPassword(e.target.value)}
                type={ShowPassword ? "text" : "password"}
                id="Password"
                className="w-full px-3 py-2 bg-[#FDFEFF] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#2D3134]"
                onClick={ShowThPassword}
              >
                {ShowPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className={`${PasswordMessage} mt-2 text-sm text-[#fdb713]`}>
              Please enter your password
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#fdb713] hover:bg-[#f8c95c] text-[#FDFEFF] font-bold rounded-md transition duration-200 "
          >
            Log In
          </button>
        </form>
        <GoogleButton/>

        <p className="text-center text-[#2D3134] text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#fdb713] hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
