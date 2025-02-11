"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const Cyberattack: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cyberattack</h1>
      <p className="text-gray-600 mb-4">
        A cyberattack refers to malicious attempts by hackers to breach a
        computer system, steal data, or disrupt operations. Common forms of
        cyberattacks include phishing, ransomware, denial-of-service (DoS)
        attacks, and data breaches. These attacks can result in financial loss,
        reputational damage, and compromised sensitive information. Addressing
        cyberattacks requires vigilance, robust security measures, and a clear
        response plan to mitigate risks and restore normal operations.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Cyberattack
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          <strong>Identify the Breach:</strong> Monitor systems for unusual
          activity or unauthorized access.
        </li>
        <li>
          <strong>Isolate Affected Systems:</strong> Disconnect compromised
          devices from the network to prevent further damage.
        </li>
        <li>
          <strong>Notify IT Teams:</strong> Inform cybersecurity personnel to
          assess and contain the attack.
        </li>
        <li>
          <strong>Change Credentials:</strong> Update passwords and disable
          accounts that may have been compromised.
        </li>
        <li>
          <strong>Restore from Backups:</strong> Use secure backups to recover
          lost or corrupted data.
        </li>
        <li>
          <strong>Report the Attack:</strong> Notify law enforcement and
          regulatory bodies as required.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Cyberattacks
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Implement strong password policies and enforce multi-factor
          authentication.
        </li>
        <li>
          Conduct regular employee training on phishing and cybersecurity
          awareness.
        </li>
        <li>Install firewalls and antivirus software to protect systems.</li>
        <li>
          Keep software and operating systems updated with security patches.
        </li>
        <li>Encrypt sensitive data and use secure storage solutions.</li>
        <li>Back up critical data regularly to prevent data loss.</li>
        <li>Monitor network activity for unusual or unauthorized access.</li>
        <li>Establish an incident response plan for cyberattacks.</li>
        <li>
          Limit access to sensitive data based on roles and responsibilities.
        </li>
        <li>
          Engage a cybersecurity firm to conduct periodic security audits.
        </li>
      </ul>
      <BackButton />
    </div>
  );
};

export default Cyberattack;
