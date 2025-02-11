import { HoverEffect } from "../components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-8 py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16">
        Explore Crisis Management Solutions
      </h1>
      <div className="max-w-7xl w-full">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

export const projects = [
  {
    title: "Incident Reporting",
    description:
      "Streamline the reporting process with real-time tools to manage and document crises effectively.",
    link: "/incident",
  },
  {
    title: "Training Programs",
    description:
      "Comprehensive training courses to equip your team with the skills needed to handle crises efficiently.",
    link: "/training",
  },
  {
    title: "Contact Us",
    description:
      "Reach out to us anytime, anywhere for support and assistance with your crisis management needs.",
    link: "/contact",
  },
];
