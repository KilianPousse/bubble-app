import { useState } from "react";

function StatusDropdown({ user, onChangeStatus }) {
    const [status, setStatus] = useState(user.status || "offline");
    const [isOpen, setIsOpen] = useState(false);

    const statusOptions = [
        { value: "online", label: "Online", color: "bg-green-500", dotColor: "bg-green-400" },
        { value: "offline", label: "Offline", color: "bg-gray-500", dotColor: "bg-gray-400" },
        { value: "busy", label: "Busy", color: "bg-red-500", dotColor: "bg-red-400" },
    ];

    const currentStatus = statusOptions.find(option => option.value === status);

    const handleChange = (newStatus) => {
        setStatus(newStatus);
        setIsOpen(false);
        
        if(onChangeStatus) {
            onChangeStatus(newStatus); 
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const styles = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
        }
    `;

    return (
        <>
            {/* Style CSS */}
            <style>{styles}</style>
            
            <div className="relative flex justify-center">
                {/* Button */}
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-3 bg-[#263141] hover:bg-gray-700/80 rounded-3xl px-3 py-2 transition-all duration-200 hover:shadow-lg group w-auto min-w-[120px] max-w-[140px]"
                >
                    <div className="flex items-center gap-2 flex-1 justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${status === "online" ? "animate-pulse" : ""} ${currentStatus?.dotColor}`}></div>
                        <span className="text-white font-medium text-sm whitespace-nowrap">
                            {currentStatus?.label}
                        </span>
                    </div>
                    <svg 
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#263141] rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn mx-auto w-[120px]">
                        <div className="">
                            {/* Current status */}
                            <button
                                key={currentStatus.value}
                                onClick={() => handleChange(currentStatus.value)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-left transition-all duration-150 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                                <div className={`w-2 h-2 rounded-full ${currentStatus.dotColor} ${currentStatus.value === "online" ? "animate-pulse" : ""}`}></div>
                                <span className="font-medium text-xs flex-1">{currentStatus.label}</span>
                            </button>

                            {/* Separator */}
                            <div className="h-px bg-gray-600 mx-2 my-1"></div>

                            {/* Other status options */}
                            {statusOptions
                                .filter(option => option.value !== status)
                                .map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleChange(option.value)}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-left transition-all duration-150 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${option.dotColor} ${option.value === "online" ? "animate-pulse" : ""}`}></div>
                                        <span className="font-medium text-xs flex-1">{option.label}</span>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                )}

                {/* Overlay */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </>
    );
}

export default StatusDropdown;