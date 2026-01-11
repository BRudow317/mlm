import { Wrench, Hammer, Shovel, Truck, Trees, Trash2, LandPlot, Construction, Home, CarFront } from "lucide-react";

/**
 * Default service catalog (6 offerings with icons).
 */

export { SERVICE_OFFERINGS, DEFAULT_SERVICES };

const SERVICE_OFFERINGS = [
  {id: "excavation-grading", title: "Excavation & Grading", Icon: Shovel,
    description: "Precision excavation and grading to prepare any site for construction or landscaping."},
  {id: "land-clearing", title: "Land Clearing", Icon: Trees,
    description: "Efficient removal of trees, brush, and debris to ready your land for its next purpose."},
  {id: "water-management", title: "Water Management",  Icon: Home,
    description: "Professional solutions to manage water flow and prevent land degradation."},
  {id: "gravel-driveways", title: "Gravel Driveways", Icon: CarFront,
    description: "Durable and well-constructed gravel driveways tailored to your property's needs."},
  {id: "material-delivery", title: "Material Delivery", Icon: Truck,
    description: "Reliable delivery of construction materials to your site, ensuring timely project completion."},
  {id: "site-preparation", title: "Site Preparation", Icon: Construction,
    description: "Preparing your site for construction with expert grading, leveling, and clearing services."},
];

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