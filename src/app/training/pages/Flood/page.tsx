"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const Flood: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Flood</h1>
      <p className="text-gray-600 mb-4">
        Floods are natural disasters caused by excessive rainfall, overflowing
        rivers, or dam failures. They can devastate communities by damaging
        homes, infrastructure, and agricultural lands, while posing significant
        risks to life and health. Floodwaters can spread contamination, disrupt
        transportation, and make rescue operations challenging. Preparing for
        floods and knowing how to respond effectively can save lives and reduce
        property loss.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Flood
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Monitor Weather Alerts:</strong> Stay updated on flood
          warnings through local authorities and weather channels.
        </li>
        <li>
          <strong>Prepare Emergency Kits:</strong> Include essentials like
          water, food, flashlights, batteries, and medications.
        </li>
        <li>
          <strong>Secure Property:</strong> Move valuables to higher ground and
          disconnect electrical appliances.
        </li>
        <li>
          <strong>Evacuate if Advised:</strong> Follow evacuation orders and
          move to designated shelters.
        </li>
        <li>
          <strong>Avoid Floodwaters:</strong> Do not walk or drive through
          moving water, as it can be deceptive and dangerous.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Floods
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Build flood barriers and levees in vulnerable areas.</li>
        <li>Ensure proper drainage systems to manage rainwater.</li>
        <li>Maintain natural wetlands to absorb floodwaters.</li>
        <li>Plant vegetation to reduce soil erosion and water runoff.</li>
        <li>Avoid building in flood-prone zones.</li>
        <li>Keep storm drains and gutters clear of debris.</li>
        <li>Install sump pumps in basements to prevent flooding.</li>
        <li>Develop community flood evacuation plans.</li>
        <li>Educate residents about flood preparedness.</li>
        <li>Invest in flood forecasting and early warning systems.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default Flood;
