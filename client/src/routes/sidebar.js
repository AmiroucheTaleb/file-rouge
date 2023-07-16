/** Icons are imported separatly to reduce build time */

import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";

import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";

import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Garage",
  },
  {
    path: "/app/fuels", // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "journal de ravitaillement", // name that appear in Sidebar
  },
  {
    path: "/app/leads", // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "maintenance", // name that appear in Sidebar
  },
  {
    path: "/app/transactions", // url
    icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
    name: "Depenses", // name that appear in Sidebar
  },
  {
    path: "/app/charts", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Statistique", // name that appear in Sidebar
  },
  {
    path: "/app/integration", // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: "Integration", // name that appear in Sidebar
  },
  {
    path: "/app/calendar", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "planning", // name that appear in Sidebar
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: "Documentation", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/getting-started", // url
        icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
        name: "Getting Started", // name that appear in Sidebar
      },
      {
        path: "/app/features",
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: "Features",
      },
      {
        path: "/app/components",
        icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
        name: "Components",
      },
    ],
  },
];

export default routes;
