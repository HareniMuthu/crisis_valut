"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const ChemicalSpill: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Chemical Spill</h1>
      <p className="text-gray-600 mb-4">
        Chemical spills can pose serious hazards to human health and the
        environment. Spills may occur during industrial processes,
        transportation, or storage. They can result in exposure to toxic
        substances, fires, or contamination of soil and water. Addressing a
        chemical spill requires careful planning, protective measures, and
        immediate containment to minimize harm.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Chemical Spill
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Evacuate the Area:</strong> Move people to a safe distance and
          ensure the area is clear of non-essential personnel.
        </li>
        <li>
          <strong>Identify the Chemical:</strong> Use labels or safety data
          sheets to understand the nature of the spilled substance.
        </li>
        <li>
          <strong>Notify Authorities:</strong> Report the spill to emergency
          response teams and environmental agencies.
        </li>
        <li>
          <strong>Wear Protective Gear:</strong> Use appropriate personal
          protective equipment (PPE) before handling the spill.
        </li>
        <li>
          <strong>Contain the Spill:</strong> Use absorbents, booms, or barriers
          to prevent the chemical from spreading.
        </li>
        <li>
          <strong>Neutralize if Safe:</strong> For certain chemicals, apply
          neutralizing agents to mitigate hazards.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Chemical Spills
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Store chemicals in labeled, secure containers.</li>
        <li>Provide regular training for employees on spill response.</li>
        <li>Inspect storage areas and containers for leaks or damage.</li>
        <li>Ensure proper transportation protocols for hazardous materials.</li>
        <li>Maintain accessible safety data sheets for all chemicals.</li>
        <li>Install spill containment systems in high-risk areas.</li>
        <li>Use secondary containment trays for liquid chemicals.</li>
        <li>Limit the quantity of hazardous chemicals stored on-site.</li>
        <li>
          Monitor storage environments for temperature and pressure changes.
        </li>
        <li>Conduct periodic safety audits to identify risks.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default ChemicalSpill;
