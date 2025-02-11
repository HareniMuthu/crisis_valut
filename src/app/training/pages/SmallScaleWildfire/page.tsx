"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const SmallScaleWildfire: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Small-Scale Wildfire
      </h1>
      <p className="text-gray-600 mb-4">
        Wildfires are unplanned fires that burn in forests, grasslands, or
        suburban areas. Small-scale wildfires can spread rapidly, threatening
        homes, lives, and wildlife. They are often caused by human activity,
        lightning strikes, or prolonged dry conditions. Knowing how to act
        during a wildfire can save lives and reduce damage to property and the
        environment.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Small-Scale Wildfire
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Evacuate Immediately:</strong> Follow evacuation orders from
          authorities and move to designated safe zones.
        </li>
        <li>
          <strong>Seal Your Home:</strong> Close all doors and windows to
          prevent embers from entering.
        </li>
        <li>
          <strong>Clear the Area:</strong> Remove flammable materials like dry
          leaves and furniture near your property.
        </li>
        <li>
          <strong>Stay Informed:</strong> Monitor local news and emergency
          updates.
        </li>
        <li>
          <strong>Assist Neighbors:</strong> Help elderly or disabled
          individuals evacuate.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Wildfires
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Create defensible space by clearing vegetation around homes.</li>
        <li>Use fire-resistant materials for roofing and siding.</li>
        <li>Install spark arrestors on chimneys.</li>
        <li>Avoid outdoor burning during dry or windy conditions.</li>
        <li>Follow local fire safety regulations.</li>
        <li>Equip homes with fire extinguishers and water hoses.</li>
        <li>Plant fire-resistant vegetation around properties.</li>
        <li>Participate in community wildfire prevention programs.</li>
        <li>Keep emergency kits ready with essentials like water and masks.</li>
        <li>Educate yourself and family about wildfire evacuation routes.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default SmallScaleWildfire;
