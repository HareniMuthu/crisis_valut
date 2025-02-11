// File: src/utils/predictCrisis.ts

export const CRISIS_KEYWORDS: { [key: string]: string[] } = {
  POWER_OUTAGE: ["power", "electricity", "blackout", "outage", "grid failure"],
  ROAD_ACCIDENT: ["accident", "collision", "road", "traffic", "vehicle crash"],
  BUILDING_FIRE: ["fire", "burning", "flames", "smoke", "firefighters"],
  FLOOD: ["flood", "water", "rising levels", "inundation", "overflow"],
  CIVIL_UNREST: [
    "protest",
    "riot",
    "demonstration",
    "unrest",
    "civil disturbance",
  ],
  CYBERATTACK: [
    "cyberattack",
    "hacking",
    "malware",
    "data breach",
    "ransomware",
  ],
};

export function predictCrisis(description: string): string {
  const descriptionLower = description.toLowerCase();

  for (const [crisisType, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (descriptionLower.includes(keyword)) {
        return crisisType;
      }
    }
  }

  return "UNKNOWN_CRISIS";
}
