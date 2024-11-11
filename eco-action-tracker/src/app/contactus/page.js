"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Twitter, Facebook, Youtube } from "lucide-react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/contactus", {
        Name: formData.name,
        Email: formData.email,
        Message: formData.message,
      });

      if (response.status === 200) {
        setResponseMessage(
          "Your message has been sent. We will get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" }); // Reset form data
      } else {
        setResponseMessage(
          "There was an error sending your message. Please try again later."
        );
      }
    } catch (error) {
      setResponseMessage(
        "There was an error sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br bg-[#2c2f32]  min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 mt-[68px]">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* Contact Information */}
        <div className="bg-[#2D3134] text-white p-8 md:p-12 flex flex-col justify-between md:w-2/5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <p className="mb-8 text-lg opacity-90">
              Say something to start a live chat!
            </p>
            <div className="space-y-6 text-md">
              <p className="flex items-center">
                <Phone className="mr-4" size={24} /> +962 7712 3456 789
              </p>
              <p className="flex items-center">
                <Mail className="mr-4" size={24} />{" "}
                EcoSustainableSystem@gmail.com
              </p>
              <p className="flex items-center">
                <MapPin className="mr-4" size={24} /> Happiness previously, King
                Hussein Street, Zarqa 13110
              </p>
            </div>
          </div>
          <div className="mt-12 flex space-x-4">
            <Twitter
              size={24}
              className="cursor-pointer hover:text-[#fdb713] transition-colors"
            />
            <Facebook
              size={24}
              className="cursor-pointer hover:text-[#fdb713] transition-colors"
            />
            <Youtube
              size={24}
              className="cursor-pointer hover:text-[#fdb713] transition-colors"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-80 md:h-80">
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#fdb713] rounded-full opacity-50"></div>
              <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#aa8225] rounded-full opacity-10"></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 md:p-12 md:w-3/5 bg-white">
          {responseMessage && (
            <div className="mb-4 p-4 text-green-600 bg-green-100 border border-green-300 rounded">
              {responseMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-full">
                <label className="text-sm text-gray-600 font-medium block mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-gray-300 focus:border-[#fdb713] transition-colors focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium block mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border-b-2 border-gray-300 focus:border-[#fdb713] transition-colors focus:outline-none"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium block mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full max-h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-[#fdb713] transition-colors focus:outline-none"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#fdb713] to-[#fdb713] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#b75931] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fdb713] focus:ring-opacity-50 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
