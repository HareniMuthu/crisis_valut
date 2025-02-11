"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const WaterSupplyContamination: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Water Supply Contamination
      </h1>
      <p className="text-gray-600 mb-4">
        Contaminated water supplies pose significant health risks, causing
        diseases like cholera, dysentery, and other waterborne illnesses.
        Contamination can occur due to agricultural runoff, industrial waste,
        faulty sewage systems, or natural disasters. Swift action is critical to
        prevent widespread illness and maintain safe water for daily use.
        Addressing water supply contamination requires community awareness,
        infrastructure improvements, and stringent water quality controls.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter Water Supply Contamination
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Issue a Public Alert:</strong> Inform the community not to
          consume or use contaminated water.
        </li>
        <li>
          <strong>Provide Safe Alternatives:</strong> Distribute bottled water
          or set up emergency water stations.
        </li>
        <li>
          <strong>Identify the Source:</strong> Investigate contamination causes
          such as sewage leaks, chemical spills, or industrial discharge.
        </li>
        <li>
          <strong>Treat the Water:</strong> Use filtration, chlorination, or
          boiling methods to purify water.
        </li>
        <li>
          <strong>Repair Infrastructure:</strong> Fix damaged pipelines, tanks,
          or sewage systems to prevent further contamination.
        </li>
        <li>
          <strong>Test Water Quality:</strong> Conduct rigorous testing before
          reintroducing water for public use.
        </li>
        <li>
          <strong>Collaborate with Authorities:</strong> Work with local
          governments and water management bodies to implement long-term
          solutions.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Water Supply Contamination
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Implement regular testing of water supplies for contaminants.</li>
        <li>
          Ensure proper waste disposal to avoid contaminating water bodies.
        </li>
        <li>Maintain sewage systems and repair leaks promptly.</li>
        <li>
          Encourage sustainable farming practices to reduce agricultural runoff.
        </li>
        <li>Promote community awareness about safe water practices.</li>
        <li>Regulate industrial discharges into nearby water sources.</li>
        <li>Establish buffer zones around water reservoirs.</li>
        <li>Invest in modern water treatment plants and filtration systems.</li>
        <li>Encourage proper disposal of household chemicals and medicines.</li>
        <li>Have an emergency water supply plan in place for disasters.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default WaterSupplyContamination;
