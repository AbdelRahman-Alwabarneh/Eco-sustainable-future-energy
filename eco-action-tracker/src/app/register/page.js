'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Wind, Sun, AlertTriangle, Eye, EyeOff,X } from 'lucide-react';
import axios from "axios";
import GoogleButton from "@/components/GoogleButton";
import Swal from 'sweetalert2';
function SignUp() {
  const router = useRouter();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstNameShowAndHide, setFirstNameShowAndHide] = useState("hidden");
  const [LastNameShowAndHide, setLastNameShowAndHide] = useState("hidden");
  const [isLoading, setIsLoading] = useState(false);

  const [ValidationEmail, setValidationEmail] = useState("");
  const [EmailMessage, setEmailMessage] = useState("hidden");

  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(ValidationEmail);

  useEffect(() => {
    setEmailMessage(Email_Message ? "block" : "hidden");
  }, [ValidationEmail]);

  const [ValidationPassword, setValidationPassword] = useState("");
  const [ShowAndHide, setShowAndHide] = useState("hidden");
  const [NoArabic, setNoArabic] = useState("hidden");
  const [EightLettersColor, setEightLettersColor] = useState("text-red-500");
  const [CapitalLetterColor, setCapitalLetterColor] = useState("text-red-500");
  const [NoAtleastColor, setNoAtleastColor] = useState("text-red-500");
  const [SpecialCharactersColor, setSpecialCharacters] = useState("text-red-500");

  const NoArabicPassword = /[\u0600-\u06FF]/.test(ValidationPassword);
  const EightLetters = /[A-Za-z\d\W]{8,}/.test(ValidationPassword);
  const CapitalLetter = /[A-Z]/.test(ValidationPassword);
  const NoAtleast = /\d/.test(ValidationPassword);
  const SpecialCharacters = /(?=.*[^\w\s])/.test(ValidationPassword);
  useEffect(() => {
    setEightLettersColor(EightLetters ? "text-green-500" : "text-red-500");
    setCapitalLetterColor(CapitalLetter ? "text-green-500" : "text-red-500");
    setNoAtleastColor(NoAtleast ? "text-green-500" : "text-red-500");
    setSpecialCharacters(SpecialCharacters ? "text-green-500" : "text-red-500");
    setShowAndHide(ValidationPassword ? "block" : "hidden");
    setNoArabic(NoArabicPassword ? "flex" : "hidden");
  }, [ValidationPassword]);

  const [ShowPassword, setShowPassword] = useState(false);
  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }

  const [VerificationSendPassword, setVerificationSendPassword] = useState("hidden");

  const SubmitPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W])(?=.*\S)(?!.*\s{2,})[A-Za-z\d\W_]{8,}$/.test(ValidationPassword);
  const handleGoogleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/", redirect: false });
  
    if (result?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Something went wrong, please try again!',
      });
    }
  };
  
  async function sub() {
    if (FirstName === "") {
      setFirstNameShowAndHide("block");
      return;
    }
    if (LastName === "") {
      setLastNameShowAndHide("block");
      return;
    }
    if (ValidationEmail === "" || Email_Message) {
      setEmailMessage("block");
      return;
    }
    if (ValidationPassword === "" || !SubmitPassword) {
      setVerificationSendPassword("flex");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
          "http://localhost:3000/api/register",
          {
              firstName: FirstName,
              lastName: LastName,
              email: ValidationEmail,
              password: ValidationPassword,
          },
          { withCredentials: true }
      );

      // Show success message
      Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have been registered successfully!',
          timer: 1500, // Set timer to 1500 ms (1.5 seconds)
          timerProgressBar: true, // Optional: show progress bar
          showConfirmButton: false, // Hide confirm button
      }).then(() => {
          router.push('/'); // Redirect after message
      });

  } catch (error) {
      console.error("Registration error:", error);

      // Show error message with OK button
      Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'An error occurred!',
          confirmButtonText: 'OK', // Show OK button
      });
  }finally {

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
        <h1 className="text-3xl font-bold text-center text-[#2D3134] mb-6">Join the Kinetic Revolution</h1>
        
        <div className={`${NoArabic} items-center p-4 mb-4 text-sm text-[#2D3134] rounded-lg bg-[#FAF8ED] border border-[#fdb713]`} role="alert">
          <AlertTriangle className="inline w-5 h-5 mr-2 text-[#fdb713]" />
          <span>Please use English characters for the password</span>
        </div>

        <div className={`${VerificationSendPassword} items-center p-4 mb-4 text-sm text-[#2D3134] rounded-lg bg-[#FAF8ED] border border-[#fdb713]`} role="alert">
          <AlertTriangle className="inline w-5 h-5 mr-2 text-[#fdb713]" />
          <span>Please enter the password according to the specified requirements</span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); NoArabicPassword ? null : sub(); }} className="space-y-4 text-[#2D3134]">
          <div>
            <label htmlFor="First_Name" className="block mb-2 text-sm font-medium">First Name</label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
                if (e.target.value) setFirstNameShowAndHide("hidden");
              }}
              type="text"
              id="First_Name"
              className="w-full px-3 py-2 bg-[#FAF8ED] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
              placeholder="Enter your first name"
            />
            <p className={`${FirstNameShowAndHide} mt-2 text-sm text-[#fdb713]`}>Please enter your first name</p>
          </div>

          <div>
            <label htmlFor="Last_Name" className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
                if (e.target.value) setLastNameShowAndHide("hidden");
              }}
              type="text"
              id="Last_Name"
              className="w-full px-3 py-2 bg-[#FAF8ED] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
              placeholder="Enter your last name"
            />
            <p className={`${LastNameShowAndHide} mt-2 text-sm text-[#fdb713]`}>Please enter your last name</p>
          </div>

          <div>
            <label htmlFor="Email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              onChange={(e) => setValidationEmail(e.target.value)}
              type="email"
              id="Email"
              className="w-full px-3 py-2 bg-[#FAF8ED] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
              placeholder="Enter your email"
            />
            <p className={`${EmailMessage} mt-2 text-sm text-[#fdb713]`}>Invalid email address</p>
          </div>

          <div>
            <label htmlFor="Password" className="block mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setValidationPassword(e.target.value)}
                type={ShowPassword ? "text" : "password"}
                id="Password"
                className="w-full px-3 py-2 bg-[#FAF8ED] border border-[#2D3134] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#2D3134]"
                onClick={ShowThPassword}
              >
                {ShowPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className={`${ShowAndHide} mt-2 space-y-1 text-sm`}>
              <p className={EightLettersColor}>8 characters minimum</p>
              <p className={CapitalLetterColor}>At least one uppercase letter</p>
              <p className={NoAtleastColor}>At least one number</p>
              <p className={SpecialCharactersColor}>At least one special character</p>
            </div>
          </div>

          <button
            type="submit"
            onClick={sub}
            className={`w-full px-4 py-2 font-bold text-white bg-[#fdb713] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdb713] transition-all duration-300 hover:bg-opacity-70 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </form>
        <GoogleButton/>
        <p className="text-center text-[#2D3134] text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#fdb713] hover:underline font-semibold">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default SignUp;