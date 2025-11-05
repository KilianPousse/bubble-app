import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BackIcon,
  UserIcon,
  SecurityIcon,
  NotificationIcon,
  SettingsIcon,
} from "../lib/icons";
import PageTitle from "../components/TitlePage";

const categories = [
  { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
  { id: "user", label: "User", icon: <UserIcon size={18} /> },
  { id: "security", label: "Security", icon: <SecurityIcon size={18} /> },
  { id: "notifications", label: "Notifications", icon: <NotificationIcon size={18} /> },
];

function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeCategory = location.pathname.split("/").pop();

  return (
    <div className="flex bg-slate-900 min-h-screen text-white w-full">
      <PageTitle title="Settings"/>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-96 bg-slate-800/60 backdrop-blur-lg p-4 overflow-y-auto flex flex-col shadow-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center w-full px-3 py-2 mb-4 rounded-lg text-sm font-medium text-red-500 hover:bg-red-700/30 transition-colors"
        >
          <span className="mr-1"><BackIcon size={18} /></span> Back
        </button>

        <hr className="border-t border-gray-100/20" />

        <h2 className="text-lg font-semibold my-4 text-white">Settings</h2>

        <nav className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/settings/${cat.id}`}
              className={`flex items-center w-full pl-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-sky-700/50 text-sky-400"
                  : "text-slate-300 hover:bg-slate-700/30"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-96 p-8 min-h-screen text-left">
        <div className="ml-16 mr-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SettingsLayout;
