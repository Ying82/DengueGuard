"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const getLocationAndWeather = async () => {
  return {
    location: "Kuala Lumpur, Malaysia", // Replace with actual location API
    humidity: "85%", // Simulated high humidity (Real API needed)
    outbreak: true, // Simulating a dengue outbreak (Real API needed)
  };
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Describe your symptoms, and I’ll assess your risk for dengue.",
    },
  ]);
  const [input, setInput] = useState("");
  const [waitingForImage, setWaitingForImage] = useState(false);
  const [userData, setUserData] = useState(null);
  const [rashAndFeverDetected, setRashAndFeverDetected] = useState(false);

  useEffect(() => {
    getLocationAndWeather().then(setUserData);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // 🔹 Check if "rash" is mentioned (with or without fever) and request an image
    if (userMessage.includes("rash")) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Since you mentioned a rash, please upload an image for analysis.",
        },
      ]);
      setWaitingForImage(true);
      setRashAndFeverDetected(true);
      return; // Stop further processing so it doesn't send another risk assessment message
    }

    // 🔹 If "rash" is NOT mentioned, proceed with risk assessment
    setTimeout(() => {
      const response = generateRiskAssessment(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && waitingForImage) {
      const imageUrl = URL.createObjectURL(file);
      setWaitingForImage(false);
      setRashAndFeverDetected(false);

      setMessages((prev) => [
        ...prev,
        { sender: "user", image: imageUrl },
        {
          sender: "bot",
          text: "Analyzing rash... (AI is checking for dengue symptoms)",
        },
      ]);

      setTimeout(() => {
        const response = analyzeRashAndLocation();
        setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      }, 2000);
    }
  };

  const generateRiskAssessment = (symptoms) => {
    if (!userData) return "Loading location data...";

    let riskLevel = "MODERATE";
    if (userData.outbreak && parseInt(userData.humidity) > 80) {
      riskLevel = "HIGH";
    }

    return `Based on your symptoms and location (${userData.location}, Dengue outbreak detected), your estimated risk is **${riskLevel}**. Seek medical attention within 24 hours if symptoms worsen.`;
  };

  const analyzeRashAndLocation = () => {
    if (!userData) return "Loading data...";

    let riskMessage =
      "🔴 HIGH RISK - Your rash and symptoms suggest possible dengue. Seek medical help immediately!";

    if (!userData.outbreak && parseInt(userData.humidity) < 70) {
      riskMessage =
        "🟡 MODERATE RISK - Dengue is less common in your area, but monitor your symptoms closely.";
    }

    return `${riskMessage} Location: ${userData.location}, Humidity: ${userData.humidity}`;
  };

  return (
    <div className="bg-[#0B132B] min-h-screen flex flex-col items-center p-6 text-white">
      <div className="max-w-4xl w-full h-screen bg-[#0D1B2A] p-6 rounded-lg shadow-lg flex flex-col border-r-1 border-l-1 border-[#1CDAE6]">
        <h2 className="text-lg font-semibold text-center mb-4">
          Dengue Chatbot
        </h2>

        {/* Chat Messages */}
        <div className="flex-1 space-y-2 overflow-y-auto max-h-[500px] p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && <span className="mr-2">🤖</span>}

              <div
                className={`p-3 rounded-lg text-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800"
                }`}
              >
                {msg.image ? (
                  <Image
                    src={msg.image}
                    alt="Uploaded rash"
                    width={250}
                    height={150}
                    className="rounded-md border border-gray-700"
                  />
                ) : (
                  <>
                    <p className="mb-1">{msg.text}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Typing Bar */}
        <form
          onSubmit={sendMessage}
          className="flex items-center bg-gray-900 p-3 rounded-lg mt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-transparent outline-none text-white px-3 text-lg"
          />

          {/* Upload Icon */}
          <label htmlFor="imageUpload" className="cursor-pointer mx-2">
            📎
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
          />

          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
