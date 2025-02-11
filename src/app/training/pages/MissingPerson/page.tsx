"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const MissingPerson: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Missing Person</h1>
      <p className="text-gray-600 mb-4">
        A missing person crisis occurs when someone is reported missing, often
        under distressing circumstances. Quick and coordinated efforts are
        essential to locate the individual and ensure their safety. Situations
        leading to missing persons may include kidnappings, natural disasters,
        or individuals wandering away due to cognitive impairments like
        dementia.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Missing Person Crisis
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Report Immediately:</strong> Contact local law enforcement to
          file a missing person report.
        </li>
        <li>
          <strong>Provide Details:</strong> Share the person&apos;s photo,
          clothing description, last known location, and other identifiers.
        </li>
        <li>
          <strong>Organize Search Teams:</strong> Collaborate with authorities
          and the community to search the surrounding areas.
        </li>
        <li>
          <strong>Leverage Technology:</strong> Use social media, GPS tracking
          devices, or missing person databases to aid the search.
        </li>
        <li>
          <strong>Check Local Resources:</strong> Visit shelters, hospitals, or
          other likely locations.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Missing Persons
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Install GPS tracking devices for children and elderly individuals.
        </li>
        <li>Educate children about safety measures and stranger danger.</li>
        <li>
          Maintain open communication and share travel plans with loved ones.
        </li>
        <li>
          Secure homes to prevent wandering, especially for dementia patients.
        </li>
        <li>
          Ensure caregivers are attentive and trained in handling emergencies.
        </li>
        <li>Set up neighborhood watch programs to improve vigilance.</li>
        <li>
          Encourage community awareness about missing persons&apos; resources.
        </li>
        <li>Keep updated photos and contact details of family members.</li>
        <li>Use ID bracelets or cards for vulnerable individuals.</li>
        <li>Regularly review and practice safety protocols with children.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default MissingPerson;
