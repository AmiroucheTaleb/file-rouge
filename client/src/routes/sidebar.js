/** Icons are imported separatly to reduce build time */

import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";

const iconClasses = `h-10 w-10`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <img src='/garage.png' className={iconClasses} />,
    name: "Garage",
  },
  {
    path: "/app/fuels", // url
    icon: <img src='/de-lessence.png' className={iconClasses} />, // icon component
    name: "journal de ravitaillement", // name that appear in Sidebar
  },
  {
    path: "/app/vidanges", // url
    icon: <img src='/gaz.png' className={iconClasses} />, // icon component
    name: "Carnet de vidanges", // name that appear in Sidebar
  },
  {
    path: "/app/charts", // url
    icon: <img src='/graphique.png' className={iconClasses} />, // icon component
    name: "Statistique", // name that appear in Sidebar
  },
  {
    path: "/app/integration", // url
    icon: <img src='/frein.png' className={iconClasses} />, // icon component
    name: "Integration", // name that appear in Sidebar
  },
  {
    path: "/app/calendar", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "planning", // name that appear in Sidebar
  },
];

export default routes;
