"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const CivilUnrest: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Civil Unrest</h1>
      <p className="text-gray-600 mb-4">
        Civil unrest refers to situations of public disorder, protests, or
        violence caused by social, political, or economic grievances. These
        events can disrupt daily life, pose significant risks to public safety,
        and damage property. Common examples include strikes, demonstrations,
        riots, and acts of vandalism. Understanding how to handle civil unrest
        safely is essential for individuals, businesses, and communities to
        minimize harm and ensure public order. Preparedness and effective
        communication during such crises are key to maintaining stability.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter Civil Unrest
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Stay Informed:</strong> Monitor news and social media updates
          to understand the scope and location of the unrest.
        </li>
        <li>
          <strong>Avoid Affected Areas:</strong> Stay away from protest zones or
          areas where unrest is escalating.
        </li>
        <li>
          <strong>Secure Property:</strong> Lock doors, secure windows, and
          remove valuable items from view.
        </li>
        <li>
          <strong>Develop an Emergency Plan:</strong> Establish a safe route and
          location to evacuate if necessary.
        </li>
        <li>
          <strong>Coordinate with Authorities:</strong> Follow instructions from
          law enforcement and emergency responders.
        </li>
        <li>
          <strong>Ensure Communication:</strong> Keep mobile devices charged and
          maintain contact with family or colleagues.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Civil Unrest
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Promote dialogue and address grievances early to avoid escalation.
        </li>
        <li>
          Enhance community engagement and build trust among diverse groups.
        </li>
        <li>
          Train staff and community members in conflict resolution techniques.
        </li>
        <li>
          Install surveillance systems to monitor public spaces for early
          warnings.
        </li>
        <li>Maintain open lines of communication with local authorities.</li>
        <li>
          Develop contingency plans for businesses to operate during unrest.
        </li>
        <li>Educate employees and residents on emergency protocols.</li>
        <li>Encourage lawful assembly and peaceful demonstrations.</li>
        <li>
          Strengthen public awareness of legal rights and responsibilities.
        </li>
        <li>
          Invest in local infrastructure to address social and economic
          inequalities.
        </li>
      </ul>
      <BackButton />
    </div>
  );
};

export default CivilUnrest;
