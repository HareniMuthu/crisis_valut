"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const HeatWave: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Heat Wave</h1>
      <p className="text-gray-600 mb-4">
        Heat waves are prolonged periods of excessively high temperatures that
        pose significant health risks, especially to vulnerable populations like
        children, the elderly, and those with chronic illnesses. These events
        can cause dehydration, heat exhaustion, or heatstroke, and they often
        result in increased mortality. Heat waves can also disrupt
        infrastructure, strain energy systems, and affect agricultural output.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Heat Wave
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Stay Hydrated:</strong> Drink plenty of water throughout the
          day to avoid dehydration.
        </li>
        <li>
          <strong>Avoid Outdoor Activities:</strong> Limit physical activity
          during peak heat hours (10 a.m. to 4 p.m.).
        </li>
        <li>
          <strong>Use Cooling Devices:</strong> Use fans, air conditioning, or
          damp cloths to stay cool.
        </li>
        <li>
          <strong>Check on Vulnerable Individuals:</strong> Ensure that elderly
          neighbors, children, and pets are safe.
        </li>
        <li>
          <strong>Seek Cool Shelters:</strong> Visit cooling centers or public
          places like libraries or malls.
        </li>
        <li>
          <strong>Avoid Alcohol and Caffeine:</strong> These can dehydrate your
          body further.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Heat Waves
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Plant trees and create green spaces to reduce urban heat.</li>
        <li>Insulate homes to maintain cooler indoor temperatures.</li>
        <li>Install reflective roofing materials to reduce heat absorption.</li>
        <li>Encourage community awareness campaigns about heat wave safety.</li>
        <li>
          Ensure access to affordable cooling solutions for vulnerable
          populations.
        </li>
        <li>Use energy-efficient appliances to reduce grid strain.</li>
        <li>Keep hydrated and carry water during outdoor activities.</li>
        <li>Wear light-colored, loose-fitting clothing in hot weather.</li>
        <li>
          Encourage city planning to incorporate heat mitigation strategies.
        </li>
        <li>Track weather forecasts and issue timely heat wave warnings.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default HeatWave;
