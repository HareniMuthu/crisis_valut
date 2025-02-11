"use client";

import React from "react";
import BackButton from "../../components/backbutton";

const FoodContamination: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Food Contamination
      </h1>
      <p className="text-gray-600 mb-4">
        Food contamination is a serious issue that can lead to foodborne
        illnesses, affecting millions of people worldwide every year. It occurs
        when harmful bacteria, viruses, parasites, or chemicals come into
        contact with food. Contaminated food can cause symptoms like nausea,
        vomiting, diarrhea, and even severe complications requiring
        hospitalization. Poor hygiene, improper food storage, and cross
        contamination are some of the leading causes of food contamination.
        Understanding how to address and prevent these issues is crucial for
        maintaining public health and safety.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Steps to Counter Food Contamination
      </h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        <li>
          **Identify the Source**: Determine which food items are contaminated
          and isolate them immediately.
        </li>
        <li>
          **Dispose of Contaminated Food**: Safely discard any food suspected of
          contamination to prevent further spread.
        </li>
        <li>
          **Clean and Sanitize**: Thoroughly wash and sanitize all surfaces,
          utensils, and storage areas that came into contact with the food.
        </li>
        <li>
          **Notify Authorities**: Inform local health authorities about the
          contamination incident, especially if it affects the public.
        </li>
        <li>
          **Monitor Health**: Observe for symptoms among individuals who
          consumed the food and seek medical attention if needed.
        </li>
        <li>
          **Recall Products**: If contamination occurs in a commercial setting,
          issue a product recall to protect consumers.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Prevention Tips for Food Contamination
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Maintain clean and hygienic food preparation areas.</li>
        <li>
          Store food at appropriate temperatures to prevent bacterial growth.
        </li>
        <li>
          Avoid cross contamination by using separate utensils for raw and
          cooked foods.
        </li>
        <li>Wash fruits and vegetables thoroughly before consumption.</li>
        <li>Ensure all food handlers practice proper hygiene.</li>
        <li>Cook food to the recommended temperatures to kill pathogens.</li>
        <li>Regularly inspect food storage facilities for pests.</li>
        <li>Label and date stored food to track expiration.</li>
        <li>Implement strict quality controls for food suppliers.</li>
        <li>Educate staff and consumers about food safety practices.</li>
      </ul>
      <BackButton />
    </div>
  );
};

export default FoodContamination;
