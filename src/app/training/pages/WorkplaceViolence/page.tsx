"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const WorkplaceViolence: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Workplace Violence
      </h1>
      <p className="text-gray-600 mb-4">
        Workplace violence includes physical assaults, threats, harassment, or
        other disruptive behaviors in a work environment. It can endanger
        employee safety, harm productivity, and create a hostile work
        atmosphere. Common causes include interpersonal conflicts, stress, or
        unresolved grievances. Addressing workplace violence requires proactive
        policies, training, and swift responses to incidents.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter Workplace Violence
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Recognize Warning Signs:</strong> Identify behaviors such as
          aggression or threats.
        </li>
        <li>
          <strong>Report Incidents:</strong> Encourage employees to report
          violent or suspicious behavior immediately.
        </li>
        <li>
          <strong>Intervene Safely:</strong> De-escalate situations without
          putting others at risk.
        </li>
        <li>
          <strong>Call for Help:</strong> Contact security or law enforcement if
          the situation escalates.
        </li>
        <li>
          <strong>Support Affected Employees:</strong> Provide counseling and
          resources to impacted individuals.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Workplace Violence
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Establish a zero-tolerance policy for violence.</li>
        <li>Conduct regular training on conflict resolution.</li>
        <li>Encourage open communication to address grievances early.</li>
        <li>Install security systems like cameras and alarms.</li>
        <li>Screen job applicants for red flags during hiring.</li>
        <li>Provide employee assistance programs (EAPs).</li>
        <li>Develop an emergency response plan for violent incidents.</li>
        <li>Monitor workplace dynamics for signs of conflict.</li>
        <li>Train managers to identify and address workplace issues.</li>
        <li>Encourage teamwork and mutual respect among employees.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default WorkplaceViolence;
