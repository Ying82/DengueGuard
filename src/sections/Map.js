"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Polygon,
  HeatmapLayerF,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const center = { lat: 3.140634, lng: 101.6909882 };

// 🔴 Outbreak areas
const highRiskAreas = [
  {
    name: "BK",
    paths: [
      { lat: 3.1408, lng: 101.6932 },
      { lat: 3.142, lng: 101.705 },
      { lat: 3.145, lng: 101.7 },
      { lat: 3.1408, lng: 101.6932 },
    ],
  },
];

// 🔵 Predicted outbreak zones
const predictedOutbreakAreas = [
  {
    name: "Johor Bahru",
    paths: [
      { lat: 1.511692, lng: 103.7174814 },
      { lat: 1.51357, lng: 103.72327 },
      { lat: 1.5107022, lng: 103.72534 },
      { lat: 1.509749, lng: 103.718953 },
      { lat: 1.511692, lng: 103.71748 },
    ],
  },
];

// 🦟 Dengue cases for heatmap
const mockDengueCases = [
  { lat: 3.1408, lng: 101.6932 },
  { lat: 5.4141, lng: 100.3288 },
  { lat: 1.4927, lng: 103.7414 },
];

export default function Map() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [reportedSites, setReportedSites] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setHeatmapData(
          mockDengueCases.map(
            (loc) => new window.google.maps.LatLng(loc.lat, loc.lng)
          )
        );
        clearInterval(interval);
      }
    }, 500);
  }, []);

  useEffect(() => {
    // Load previously reported sites from localStorage
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReportedSites(storedReports);
  }, []);

  // Convert image file to Base64
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // Handle image upload and add marker
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const base64Image = await convertBlobToBase64(file);

    const newReport = {
      lat: center.lat + (Math.random() - 0.5) * 0.02, // Random offset for new markers
      lng: center.lng + (Math.random() - 0.5) * 0.02,
      description: "Standing Water", // Example description
      image: base64Image, // Store as Base64
    };

    const updatedReports = [...reportedSites, newReport];
    setReportedSites(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative mb-50">
      <div id="map" className="pt-50"></div>
      <h2 className="text-4xl font-bold text-white mb-4 font-ebgaramond">
        Dengue Outbreak & Risk Map
      </h2>

      <div className="w-4/5 max-h-400 border-0 rounded-lg mb-10 relative">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          libraries={["visualization"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
          >
            {/* 🔴 Heatmap */}
            {heatmapData.length > 0 && (
              <HeatmapLayerF
                data={heatmapData}
                options={{ radius: 40, opacity: 0.6 }}
              />
            )}

            {/* 🔴 Polygons for real outbreak zones */}
            {highRiskAreas.map((area, index) => (
              <Polygon
                key={index}
                paths={area.paths}
                options={{
                  fillColor: "red",
                  fillOpacity: 0.4,
                  strokeColor: "darkred",
                  strokeWeight: 2,
                }}
              />
            ))}

            {/* 🔵 Polygons for predicted outbreak zones */}
            {predictedOutbreakAreas.map((area, index) => (
              <Polygon
                key={index}
                paths={area.paths}
                options={{
                  fillColor: "blue",
                  fillOpacity: 0.3,
                  strokeColor: "darkblue",
                  strokeWeight: 2,
                }}
              />
            ))}

            {/* 🟢 Custom Markers for Reported Sites */}
            {reportedSites.map((site, index) => (
              <Marker
                key={index}
                position={{ lat: site.lat, lng: site.lng }}
                icon={
                  window.google && window.google.maps
                    ? {
                        url: "picture/marker.png",
                        scaledSize: new window.google.maps.Size(40, 40),
                      }
                    : undefined
                }
                onClick={() => setSelectedMarker(site)} // Show InfoWindow on click
              />
            ))}

            {/* Show InfoWindow when a marker is clicked */}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-2">
                  <h3 className="text-lg font-bold">Potential Breeding Site</h3>
                  <p>
                    {selectedMarker.description ||
                      "This location has been reported as a mosquito breeding site."}
                  </p>
                  {selectedMarker.image && (
                    <img
                      src={selectedMarker.image}
                      alt="Breeding Site"
                      className="w-40 h-32 mt-2 rounded-lg"
                    />
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* 🔴🟦 Legend */}
      <div className="bottom-10 right-10 bg-white p-4 rounded-lg shadow-lg mb-20">
        <h3 className="text-lg font-bold">Map Indicators</h3>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <p>Confirmed Dengue Outbreak</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <p>AI-Predicted Dengue Risk</p>
        </div>
        <div className="flex items-center mt-2">
          <img
            src="picture/marker.png"
            alt="Breeding Site"
            className="w-4 h-4 mr-2"
          />
          <p>Potential Breeding Site</p>
        </div>
      </div>
    </div>
  );
}
