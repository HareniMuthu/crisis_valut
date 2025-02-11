"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const GasLeak: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gas Leak</h1>
      <p className="text-gray-600 mb-4">
        Gas leaks are dangerous incidents that can lead to explosions, fires, or
        poisoning. Leaking natural gas, which is often odorless, can be
        identified through its added smell of sulfur or rotten eggs, or through
        hissing sounds near pipelines or appliances. Prompt detection and
        response are critical to ensure safety and prevent catastrophic
        outcomes. Gas leaks often occur due to faulty appliances, damaged
        pipelines, or poor maintenance.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Gas Leak
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Evacuate Immediately:</strong> Leave the building or area
          immediately without turning on or off any electrical devices.
        </li>
        <li>
          <strong>Ventilate the Area:</strong> Open windows and doors to
          dissipate the gas if it is safe to do so.
        </li>
        <li>
          <strong>Avoid Ignition Sources:</strong> Do not light matches, use
          electrical switches, or start engines near the leak.
        </li>
        <li>
          <strong>Shut Off the Gas Supply:</strong> Turn off the main gas valve
          if accessible and safe to do so.
        </li>
        <li>
          <strong>Notify Authorities:</strong> Contact the gas provider or
          emergency services immediately to report the leak.
        </li>
        <li>
          <strong>Do Not Re-enter:</strong> Do not return to the building until
          it has been inspected and declared safe by professionals.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Gas Leaks
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Install gas detectors in homes and workplaces.</li>
        <li>Regularly inspect and maintain gas appliances and pipelines.</li>
        <li>Ensure proper ventilation around gas appliances.</li>
        <li>Educate family and employees about gas safety procedures.</li>
        <li>Install automatic shut-off devices on gas lines.</li>
        <li>Avoid using damaged or corroded gas equipment.</li>
        <li>Store flammable materials away from gas sources.</li>
        <li>
          Be alert to signs of gas leaks, like hissing sounds or unusual smells.
        </li>
        <li>Hire licensed professionals for gas installations and repairs.</li>
        <li>
          Keep emergency numbers for the gas provider and local authorities
          readily available.
        </li>
      </ul>
      <BackButton />
    </div>
  );
};

export default GasLeak;
