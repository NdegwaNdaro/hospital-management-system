import {
  FaHospital,
  FaUserInjured,
  FaUserMd,
  FaUserNurse,
  FaAmbulance,
  FaCalendarCheck,
  FaFlask,
  FaPills,
  FaXRay,
  FaTint,
  FaMoneyBill,
  FaWarehouse,
  FaUsersCog,
  FaCog
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", path: "/", icon: <FaHospital /> },
  { title: "Patients", path: "/patients", icon: <FaUserInjured /> },
  { title: "Receptionist", path: "/receptionist", icon: <FaUserInjured /> },
  { title: "Doctors", path: "/doctors", icon: <FaUserMd /> },
  { title: "Nurses", path: "/nurses", icon: <FaUserNurse /> },
  { title: "Appointments", path: "/appointments", icon: <FaCalendarCheck /> },
  { title: "Ambulance", path: "/ambulance", icon: <FaAmbulance /> },
  { title: "Laboratory", path: "/laboratory", icon: <FaFlask /> },
  { title: "Pharmacy", path: "/pharmacy", icon: <FaPills /> },
  { title: "Radiology", path: "/radiology", icon: <FaXRay /> },
  { title: "Blood Bank", path: "/blood-bank", icon: <FaTint /> },
  { title: "Billing", path: "/billing", icon: <FaMoneyBill /> },
  { title: "Inventory", path: "/inventory", icon: <FaWarehouse /> },
  { title: "Staff", path: "/staff", icon: <FaUsersCog /> },
  { title: "Settings", path: "/settings", icon: <FaCog /> }
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200/80 bg-slate-950/95 px-5 py-6 text-slate-200 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/90 text-lg shadow-lg shadow-blue-600/20">
          <FaHospital />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Care Suite</p>
          <h2 className="text-lg font-semibold text-white">Hospital HMS</h2>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-slate-300">
        <p className="font-medium text-white">Today&apos;s overview</p>
        <p className="mt-1 text-slate-400">24 active patients • 8 urgent tasks</p>
      </div>

      <nav className="mt-6 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
