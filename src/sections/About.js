import React from "react";
import Image from "next/image";
import "./about.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row align-items-center">
          {/* Left Side - Text Content */}
          <div className="col-lg-6 order-lg-1 text-center text-lg-start">
            <h2>About Dengue Awareness</h2>
            <p>
              Dengue fever is a mosquito-borne disease affecting millions
              worldwide. Our goal is to spread awareness about its prevention,
              symptoms, and treatment.
            </p>
            <ul>
              <li>Understand the symptoms of Dengue</li>
              <li>Learn prevention methods to stay safe</li>
              <li>Spread awareness in your community</li>
            </ul>
          </div>

          {/* Right Side - Image */}
          <div
            className="col-lg-6 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="about-img">
              <Image
                src="/picture/aboutImage.png"
                alt="Dengue Awareness"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>

        {/* padding not working */}
        <div className="row align-items-center mt-5">
          <div
            className="col-lg-4 order-lg-1 d-flex justify-content-center me-lg-1 "
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="aboutimg">
              <Image
                src="/picture/image.png"
                alt="Dengue Prevention"
                width={500}
                height={400}
              />
            </div>
          </div>

          {/* Right Side - New Text Content */}
          <div className="col-lg-7 order-lg-2 text-center text-lg-start p">
            <h2>Why DengueGuard is Different</h2>
            <p>
              DengueGuard goes beyond traditional dengue awareness platforms by
              leveraging AI to provide real-time risk assessments, outbreak
              predictions, and early detection tools. Unlike static government
              reports or general symptom checkers, our platform uses AI-powered
              analysis to predict dengue risks based on symptoms, weather data,
              and historical outbreak trends.
            </p>
            <ul>
              <li>
                {String.fromCodePoint(0x1f7df)} Users can interact with an
                AI-driven chatbot to assess their risk based on symptoms, while
                public health officials gain access to machine learning-driven
                outbreak predictions that help prioritize mosquito control
                efforts.
              </li>
              <li>
                {String.fromCodePoint(0x1f7df)} Interactive dengue map
                dynamically updates high-risk areas by analyzing real-time
                weather conditions, past dengue cases, and social media trends,
                ensuring that prevention efforts are targeted and efficient.
              </li>
              <li>
                {String.fromCodePoint(0x1f7df)} Provides an AI-powered solution
                that is proactive, localized, and scalable beyond Malaysia to
                other dengue-prone regions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
