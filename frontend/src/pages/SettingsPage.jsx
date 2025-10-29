import { useState } from "react";
import {
    BackIcon,
    UserIcon,
    SecurityIcon,
    NotificationIcon,
    SettingsIcon,
} from "../components/icons";
import PageTitle from "../components/TitlePage";
import GeneralSettings from "../components/settings/GeneralSettings";
import UserSettings from "../components/settings/UserSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationsSettings from "../components/settings/NotificationsSettings";

const categories = [
  { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
  { id: "user", label: "User", icon: <UserIcon size={18} /> },
  { id: "security", label: "Security", icon: <SecurityIcon size={18} /> },
  { id: "notifications", label: "Notifications", icon: <NotificationIcon size={18} /> },
];

function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("general");

  const renderContent = () => {
    switch(activeCategory) {
      case "general":
        return <GeneralSettings />;
      case "user":
        return <UserSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationsSettings />;
      default:
        return ;
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white w-full">
        <PageTitle title="Settings"/>
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-96 bg-slate-800/60 backdrop-blur-lg p-4 overflow-y-auto flex flex-col shadow-2xl">
        {/* Back Button */}
        <button
            onClick={() => (window.location.href = '/')}
            className="flex items-center w-full px-3 py-2 mb-4 rounded-lg text-sm font-medium text-red-500 hover:bg-red-700/30 transition-colors"
        >
            <span className="mr-1"><BackIcon size={18} /></span> Back
        </button>

        <hr className="border-t border-gray-100/20" />

        <h2 className="text-lg font-semibold my-4 text-white">Settings</h2>

        <nav className="space-y-1">
            {categories.map((cat) => (
            <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center w-full pl-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id
                    ? "bg-sky-700/50 text-sky-400"
                    : "text-slate-300 hover:bg-slate-700/30"
                }`}
            >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
            </button>
            ))}
        </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-96 p-8 min-h-screen text-left">
            <div className="ml-16 mr-16">
                {/* Validate button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold capitalize text-white">
                        Settings &gt; {categories.find((c) => c.id === activeCategory)?.label}
                    </h1>
                    
                </div>
                <hr className="mb-6 border-t border-gray-100/20" />
                <div className="m-16">
                    {renderContent()}
                </div>
            </div>
        </main>
    </div>
  );
}

export default SettingsPage;