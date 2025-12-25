import { Wrench, Hammer, Shovel, Truck, Trees, Trash2, LandPlot, Construction, Home, CarFront } from "lucide-react";

const DEFAULT_SERVICES = [
  { id: "emergency-repairs", title: "Emergency", Icon: Wrench },
  { id: "demolition", title: "Demolition", Icon: Hammer },
  { id: "septic", title: "Septic", Icon: Home },
  { id: "land-grading", title: "Land Grading", Icon: LandPlot },
  { id: "debris-removal", title: "Debris", Icon: Trash2 },
  { id: "material-sales", title: "Material Sales", Icon: Construction },
  { id: "hauling", title: "Hauling", Icon: Truck },
  { id: "foundation-digging", title: "Foundations", Icon: Shovel },
  { id: "driveway", title: "Driveways", Icon: CarFront },
];
/**
 * Default service catalog (9 offerings).
 * Each card can scroll to the quote section and optionally pre-select a service.
 */
const DEFAULT_EMOJI_SERVICES = [
  { id: "emergency-repairs", title: "Emergency", icon: "???" },
  { id: "demolition", title: "Demolition", icon: "???" },
  { id: "septic", title: "Septic", icon: "??" },
  { id: "land-grading", title: "Land Grading", icon: "??" },
  { id: "debris-removal", title: "Debris", icon: "??" },
  {
    id: "material-sales",
    title: "Material Sales",
    icon: "??",
  },
  { id: "hauling", title: "Hauling", icon: "??" },
  { id: "foundation-digging", title: "Foundations", icon: "??" },
  { id: "driveway", title: "Driveways", icon: "???" },
];

export { DEFAULT_SERVICES, DEFAULT_EMOJI_SERVICES };
