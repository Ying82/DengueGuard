"use client";
import { useState } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "user", text: "I have a fever and muscle pain." },
    { sender: "bot", text: "Got it! Do you have a rash? You can upload a photo." },
  ]);
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");

  // Function to handle user text input
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      if (input.toLowerCase().includes("rash")) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Please upload a rash image for analysis." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "I'm here to assist! You can describe your symptoms or upload an image." },
        ]);
      }
    }, 1000);
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setMessages((prev) => [
        ...prev,
        { sender: "user", image: imageUrl },
        { sender: "bot", text: "Analyzing... (AI checks for dengue rash)" },
        { sender: "bot", text: "🔴 High Risk\nYou should visit a clinic ASAP!", link: "Find Nearest Clinic" },
      ]);
    }
  };

  return (
    <div className="bg-[#0B132B] min-h-screen flex flex-col items-center p-6 text-white">
      <div className="max-w-2xl w-full bg-[#0D1B2A] p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold text-center mb-4">Dengue Chatbot</h2>
        
        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] p-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && <span className="mr-2">🤖</span>}
              
              <div
                className={`p-3 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800"
                } max-w-xs`}
              >
                {msg.image ? (
                  <Image src={msg.image} alt="Uploaded rash" width={250} height={150} className="rounded-md border border-gray-700" />
                ) : (
                  <>
                    <p>{msg.text}</p>
                    {msg.link && <a href="#" className="text-blue-300 underline">{msg.link}</a>}
                  </>
                )}
              </div>
              
              {msg.sender === "user" && (
                <img src="/user-avatar.png" alt="User" className="w-8 h-8 ml-2 rounded-full border border-gray-700" />
              )}
            </div>
          ))}
        </div>

        {/* Typing Bar */}
        <form onSubmit={sendMessage} className="flex items-center bg-gray-900 p-2 rounded-lg mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-white px-2"
          />
          
          {/* Upload Icon */}
          <label htmlFor="imageUpload" className="cursor-pointer">
            <svg className="w-6 h-6 text-gray-400 hover:text-gray-200" 
                fill="none" stroke="currentColor" strokeWidth="2" 
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M21 12.5V16a2 2 0 01-2 2h-3M16 8v8a4 4 0 01-8 0V6a4 4 0 018 0v8a2 2 0 11-4 0V7" />
            </svg>



          </label>

          <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />
          
          <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
