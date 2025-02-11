"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const PowerOutage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Power Outage</h1>
      <p className="text-gray-600 mb-4">
        Power outages can occur due to severe weather, equipment failure, or
        overloading of the power grid. They can disrupt daily life, business
        operations, and essential services. Preparing for power outages and
        knowing how to respond during one is crucial for ensuring safety,
        minimizing disruption, and preventing further issues such as food
        spoilage, communication failures, or accidents caused by darkness.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Power Outage
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Stay Calm:</strong> Assess the situation and determine if the
          outage is localized or widespread.
        </li>
        <li>
          <strong>Contact Your Utility Provider:</strong> Report the outage and
          inquire about restoration time.
        </li>
        <li>
          <strong>Unplug Electronics:</strong> Disconnect sensitive appliances
          to prevent damage from power surges.
        </li>
        <li>
          <strong>Use Flashlights:</strong> Avoid candles to reduce fire risks
          and rely on battery-operated lights.
        </li>
        <li>
          <strong>Conserve Battery Power:</strong> Use mobile phones sparingly
          and keep backup batteries or power banks handy.
        </li>
        <li>
          <strong>Keep Warm or Cool:</strong> Dress appropriately for the
          weather and use blankets or cooling devices as needed.
        </li>
        <li>
          <strong>Check on Vulnerable Individuals:</strong> Ensure the safety of
          children, elderly people, and those with medical conditions.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Power Outages
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Invest in a generator or uninterruptible power supply (UPS).</li>
        <li>Keep flashlights and extra batteries in accessible locations.</li>
        <li>Maintain a supply of non-perishable food and bottled water.</li>
        <li>Install surge protectors for critical electronic devices.</li>
        <li>Monitor weather updates to prepare for storms or heatwaves.</li>
        <li>Encourage energy conservation to prevent grid overloads.</li>
        <li>Ensure your utility provider has updated contact information.</li>
        <li>Back up important files and data regularly.</li>
        <li>Keep vehicles fueled in case gas stations lose power.</li>
        <li>Educate family or staff on power outage preparedness.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default PowerOutage;
