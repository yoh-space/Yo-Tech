import { Feature } from "@/types/feature";
import { Monitor, Code2, Network, BrainCircuit, Megaphone, Users } from "lucide-react"; 

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Monitor className="w-10 h-10 text-primary" />,
    title: "Application Development",
    paragraph:
      "Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.",
  },
  {
    id: 2,
    icon: <Code2 className="w-10 h-10 text-primary" />,
    title: "Web Development",
    paragraph:
      "Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.",
  },
  {
    id: 3,
    icon: <Network className="w-10 h-10 text-primary" />,
    title: "System Development",
    paragraph:
      "Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.",
  },
  {
    id: 4,
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "AI & ML Solutions",
    paragraph:
      "Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.",
  }
];

export default featuresData;