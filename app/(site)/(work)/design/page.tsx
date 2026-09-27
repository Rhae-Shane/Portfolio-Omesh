import { Work, type WorkItem } from "@/components/sections/work";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected product and engineering work by Omesh Kumar.",
};

const data: WorkItem[] = [
  {
    src: "/projects/virbike.png",
    alt: "VIR Bike storefront for premium electric cycles",
    title: "VIR Bike Store",
    description: "Company site shipped during the VIR Bike internship",
  },
  {
    src: "/assets/projects/virbike/products.png",
    alt: "VIR Bike product catalog",
    title: "VIR Bike catalog",
    description: "Model catalog and specifications",
  },
  {
    src: "/projects/chatbot.png",
    alt: "VIR Bike WhatsApp chatbot",
    title: "VIR Bike Chatbot",
    description: "Purchases, tracking, CRM, and payments",
  },
  {
    src: "/assets/projects/chatbot/direct.png",
    alt: "VIR Bike chatbot conversation",
    title: "Chatbot flow",
    description: "WhatsApp customer flow",
  },
  {
    src: "/projects/pullquest.png",
    alt: "Pull-Quest open-source contribution platform",
    title: "Pull-Quest",
    description: "Ranking and quality signals for open-source work",
  },
  {
    src: "/projects/calcai.png",
    alt: "CalcAI handwritten math input",
    title: "CalcAI",
    description: "Calculator with Gemini-powered problem solving",
  },
];

export default function DesignPage() {
  return <Work title="Selected Work" slug="selected-work" data={data} />;
}
