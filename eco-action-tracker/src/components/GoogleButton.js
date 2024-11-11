'use client';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { signIn } from "next-auth/react";

function GoogleButton() {
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

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full px-6 py-3 rounded-md bg-white text-[#FDB713] border border-[#FDB713] shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDB713]"
    >
      <FaGoogle className="text-[#FDB713] mr-3 text-xl" />
      <span className="text-sm font-medium">Sign in with Google</span>
    </button>
  );
}

export default GoogleButton;
