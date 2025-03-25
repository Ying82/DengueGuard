"use client";
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 3.139, // Default latitude (Example: Kuala Lumpur)
  lng: 101.6869, // Default longitude
};

export default function ReportPage() {
  const [location, setLocation] = useState(center); // Stores selected location
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyAzoykP97B-mUEJK3oSdhLtmV4jO0hGLwM";

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing reports from localStorage or initialize an empty array
    const existingReports = JSON.parse(localStorage.getItem("reports")) || [];

    // Create a new report object
    const newReport = {
      lat: location.lat,
      lng: location.lng,
      description: description,
      image: image ? URL.createObjectURL(image) : null, // Store image preview URL
    };

    // Update localStorage
    const updatedReports = [...existingReports, newReport];
    localStorage.setItem("reports", JSON.stringify(updatedReports));

    alert("Report submitted successfully!");

    // Reset form
    setLocation(center);
    setDescription("");
    setImage(null);
  };
  return (
    <div className="mt-20 min-h-screen max-h-full bg-[#011329] p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Report Mosquito Breeding Site
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Google Map Picker */}
          <div>
            <label className="block text-gray-700 font-medium">
              Pick Location:
            </label>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location}
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
            <p className="text-sm text-gray-600 mt-2">
              Selected Location: {location.lat}, {location.lng}
            </p>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium">
              Description:
            </label>
            <textarea
              placeholder="Describe the case (e.g., standing water, mosquito larvae sighted)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Photo:
            </label>
            <div className="border border-gray-400 rounded-lg p-2 w-full text-center">
              <label className="cursor-pointer text-blue-950 hover:text-blue-800">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {image && (
                <p className="text-sm text-gray-600 mt-1">{image.name}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-900 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
