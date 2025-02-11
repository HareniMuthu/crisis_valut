# File: src/scripts/crisistypepredict.py

import argparse
import os
import sys
import pymongo
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(
    filename='crisistypepredict.log',
    level=logging.INFO,
    format='%(asctime)s:%(levelname)s:%(message)s'
)

# Define crisis types and associated keywords
CRISIS_KEYWORDS = {
    "POWER_OUTAGE": ["power", "electricity", "blackout", "outage", "grid failure"],
    "ROAD_ACCIDENT": ["accident", "collision", "road", "traffic", "vehicle crash"],
    "BUILDING_FIRE": ["fire", "burning", "flames", "smoke", "firefighters"],
    "FLOOD": ["flood", "water", "rising levels", "inundation", "overflow"],
    "CIVIL_UNREST": ["protest", "riot", "demonstration", "unrest", "civil disturbance"],
    "CYBERATTACK": ["cyberattack", "hacking", "malware", "data breach", "ransomware"]
}

def main():
    parser = argparse.ArgumentParser(description="Predict crisis type for a given incident.")
    parser.add_argument("incident_id", type=str, help="The incident_id of the incident to predict.")
    args = parser.parse_args()

    incident_id = args.incident_id
    logging.info(f"Starting prediction for incident_id: {incident_id}")

    # Load environment variables
    load_dotenv()
    MONGO_URI = os.getenv("DATABASE_URL")
    if not MONGO_URI:
        logging.error("DATABASE_URL not found in environment variables.")
        print("DATABASE_URL not found in environment variables.")
        sys.exit(1)

    # Connect to MongoDB
    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client.get_database()
        incidents_collection = db["Incident"]
        predictions_collection = db["Prediction"]
        logging.info("Connected to MongoDB successfully.")
    except Exception as e:
        logging.error(f"Error connecting to MongoDB: {e}")
        print(f"Error connecting to MongoDB: {e}")
        sys.exit(1)

    # Fetch the incident
    try:
        incident = incidents_collection.find_one({"incident_id": incident_id})
        if not incident:
            logging.error(f"No incident found with incident_id: {incident_id}")
            print(f"No incident found with incident_id: {incident_id}")
            sys.exit(1)
    except Exception as e:
        logging.error(f"Error fetching incident: {e}")
        print(f"Error fetching incident: {e}")
        sys.exit(1)

    description = incident.get("description", "")
    if not description:
        logging.error(f"Incident {incident_id} has no description.")
        print(f"Incident {incident_id} has no description.")
        sys.exit(1)

    # Predict crisis type
    predicted_crisis = predict_crisis(description)
    logging.info(f"Predicted crisis type for incident_id {incident_id}: {predicted_crisis}")

    # Insert prediction into MongoDB
    try:
        prediction_doc = {
            "incident_id": incident_id,
            "prediction": predicted_crisis
        }
        predictions_collection.insert_one(prediction_doc)
        logging.info(f"Prediction for incident_id {incident_id} inserted successfully.")
        print(f"Prediction for incident_id {incident_id} inserted successfully.")
    except pymongo.errors.DuplicateKeyError:
        logging.warning(f"Prediction for incident_id {incident_id} already exists.")
        print(f"Prediction for incident_id {incident_id} already exists.")
    except Exception as e:
        logging.error(f"Error inserting prediction: {e}")
        print(f"Error inserting prediction: {e}")
        sys.exit(1)

def predict_crisis(description):
    """
    Predict crisis type based on description using keyword matching.
    """
    description_lower = description.lower()
    for crisis_type, keywords in CRISIS_KEYWORDS.items():
        for keyword in keywords:
            if keyword in description_lower:
                return crisis_type
    return "UNKNOWN_CRISIS"

if __name__ == "__main__":
    main()
