"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const RoadAccident: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Road Accident</h1>
      <p className="text-gray-600 mb-4">
        Road accidents are one of the leading causes of injuries and fatalities
        worldwide. They often occur due to speeding, distracted driving,
        intoxication, or weather conditions. When a road accident happens, it
        can create chaos, endanger lives, and lead to significant property
        damage. Therefore, it is crucial to know how to handle such incidents
        effectively to minimize the impact on all parties involved. Immediate
        and proper action can save lives, provide support to those affected, and
        ensure that legal and medical processes are followed accurately.
        Awareness and preparation can significantly reduce the risks and
        consequences of road accidents.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter a Road Accident
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          **Ensure Safety**: Move yourself and your vehicle to a safe location
          if possible to avoid further collisions.
        </li>
        <li>
          **Call Emergency Services**: Contact local emergency numbers to report
          the accident and request medical and police assistance.
        </li>
        <li>
          **Check for Injuries**: Assess yourself, passengers, and others for
          injuries. Administer basic first aid if trained to do so.
        </li>
        <li>
          **Document the Scene**: Take photographs of the vehicles, road
          conditions, and any visible damage or injuries for legal and insurance
          purposes.
        </li>
        <li>
          **Exchange Information**: Collect contact, vehicle, and insurance
          details from the other drivers and witnesses.
        </li>
        <li>
          **File a Police Report**: Cooperate with authorities and ensure an
          official accident report is filed.
        </li>
        <li>
          **Notify Insurance Providers**: Inform your insurance company about
          the accident and provide necessary details and evidence.
        </li>
        <li>
          **Avoid Discussions of Fault**: Refrain from discussing who is at
          fault at the scene; let the authorities determine liability.
        </li>
        <li>
          **Provide Assistance**: If you are not injured, help others to safety
          and keep the scene secure until emergency services arrive.
        </li>
        <li>
          **Follow Up**: Seek medical attention even if you feel fine, as some
          injuries may not be immediately apparent.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Road Accidents
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Always wear seatbelts and ensure passengers do the same.</li>
        <li>Obey speed limits and drive according to road conditions.</li>
        <li>Avoid distractions like using mobile phones while driving.</li>
        <li>Do not drive under the influence of alcohol or drugs.</li>
        <li>Ensure regular maintenance of your vehicle.</li>
        <li>Adjust driving for adverse weather conditions like rain or fog.</li>
        <li>Use turn signals and follow traffic rules.</li>
        <li>Take regular breaks during long drives to avoid fatigue.</li>
        <li>Stay vigilant and watch out for pedestrians and cyclists.</li>
        <li>Always have an emergency kit in your vehicle.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default RoadAccident;
