"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const BuildingFire: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Building Fire</h1>
      <p className="text-gray-600 mb-4">
        Fires in buildings can spread quickly, endangering lives and causing
        significant property damage. Common causes include electrical faults,
        unattended cooking, flammable materials, and arson. Being prepared and
        knowing how to act during a fire can save lives and minimize damage.
        Effective fire safety planning and adherence to fire codes are critical
        for preventing such crises.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Building Fire
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Sound the Alarm:</strong> Activate the fire alarm to alert
          everyone in the building.
        </li>
        <li>
          <strong>Call Emergency Services:</strong> Dial local fire department
          numbers and report the fire immediately.
        </li>
        <li>
          <strong>Evacuate Safely:</strong> Use the nearest fire escape route
          and avoid elevators.
        </li>
        <li>
          <strong>Assist Others:</strong> Help elderly, disabled, or children
          evacuate if it is safe to do so.
        </li>
        <li>
          <strong>Close Doors Behind You:</strong> Closing doors can help
          contain the fire and slow its spread.
        </li>
        <li>
          <strong>Use a Fire Extinguisher:</strong> If trained and the fire is
          small, use a fire extinguisher to douse it.
        </li>
        <li>
          <strong>Avoid Smoke:</strong> Crawl low to the ground to avoid
          inhaling smoke while exiting.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Building Fires
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Install smoke detectors on every floor and test them regularly.</li>
        <li>
          Conduct routine inspections of electrical wiring and appliances.
        </li>
        <li>Ensure proper storage of flammable materials.</li>
        <li>Maintain fire extinguishers and train occupants in their use.</li>
        <li>Develop and practice a fire evacuation plan.</li>
        <li>Avoid overloading electrical circuits or outlets.</li>
        <li>Supervise all cooking and extinguish flames before leaving.</li>
        <li>Do not smoke indoors or discard cigarette butts carelessly.</li>
        <li>Install fire-resistant doors and windows.</li>
        <li>Ensure compliance with local fire codes and regulations.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default BuildingFire;
