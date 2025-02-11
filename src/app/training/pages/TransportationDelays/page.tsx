"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const TransportationDelays: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Transportation Delays
      </h1>
      <p className="text-gray-600 mb-4">
        Transportation delays occur due to factors such as bad weather, traffic
        congestion, or mechanical failures. They disrupt daily life, supply
        chains, and emergency responses. Managing transportation delays requires
        preparation and effective communication to mitigate their impact and
        maintain productivity.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter Transportation Delays
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Stay Updated:</strong> Monitor traffic, weather, and public
          transportation updates.
        </li>
        <li>
          <strong>Plan Alternatives:</strong> Have backup routes or modes of
          transportation ready.
        </li>
        <li>
          <strong>Communicate Delays:</strong> Inform employers, clients, or
          affected parties of potential delays.
        </li>
        <li>
          <strong>Reschedule Deliveries:</strong> Coordinate with suppliers and
          customers to adjust schedules.
        </li>
        <li>
          <strong>Prepare for Emergencies:</strong> Carry essentials like water,
          snacks, and a phone charger.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Transportation Delays
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Use GPS and real-time traffic monitoring apps.</li>
        <li>Maintain vehicles to prevent mechanical issues.</li>
        <li>Leave early to account for potential delays.</li>
        <li>Encourage flexible working hours to avoid peak traffic.</li>
        <li>Develop alternative transportation plans like carpools.</li>
        <li>Invest in public transportation improvements.</li>
        <li>Follow weather forecasts to avoid hazardous conditions.</li>
        <li>Use remote work solutions during severe disruptions.</li>
        <li>Educate employees on efficient transportation planning.</li>
        <li>Encourage walking or biking for short distances.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default TransportationDelays;
