# 🦟 Dengue Risk Prediction & Reporting Platform - DENGUEGUARD
## Deployment Link
【DENGUEGUARD】(https://dengueguard.vercel.app/)

## Demo Video

## Overview
This AI-powered web platform helps users assess dengue risk, report mosquito breeding sites, and visualize outbreak trends. It provides:
- **Dengue Outbreak & Risk Map** – Displays high-risk areas using user reports and AI predictions.
- **Report Mosquito Breeding Sites** – Users can report potential breeding sites by selecting locations on the map.
- **AI-Powered Symptom Checker** – Assesses users' dengue risk based on symptoms, including image-based rash detection.
- **Real-Time Weather & Dengue Data** – Integrates Google Maps API and OpenWeather API for location-based insights.

## Features
- **Interactive Map** – Displays:
  - 🔴 **Red Areas:** User-reported mosquito breeding sites.
  - 🔵 **Blue Areas:** AI-predicted high-risk zones based on environmental data.
- **Chatbot Symptom Checker** – Users can enter symptoms and receive an AI-based dengue risk assessment.  
- **User-Friendly Reporting** – Allows users to submit locations, descriptions, and images of mosquito breeding sites.

## 🛠Technology Stack
- **Front-End:** Next.js, Tailwind CSS
- **APIs:** Google Maps API, OpenWeather API, Malaysia Health Data
- **Future Backend Considerations:** Firebase, Node.js, TensorFlow
- **Future ML Models:**
  - **Symptom Checker** (NLP-based analysis)
  - **Outbreak Prediction** (AI model trained on weather & past dengue cases)

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- Google Maps API key

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/dengue-website.git
   cd dengue-website
   ```
2. Install dependencies:
  ```sh
  npm install
```
4. Set up environment variables:
    - Create a .env.local file in the root directory.
    - Add your Google Maps API key:
  
      ```sh
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```
5. Run the development server:
  ```sh
  npm run dev
   ```
