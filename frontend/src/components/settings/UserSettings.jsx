import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Avatar from "../Avatar";

function UserSettings() {
    const { authUser, updateProfile } = useAuthStore();
    const [username, setUsername] = useState(authUser.user.username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameUpdate = (e) => {
        e.preventDefault();
        if(username.length <= 0) {
            updateProfile({ username: "" });
        }
        else {
            updateProfile({ username: username });
        }
    };

    const handleAvatarUpload = (e) => {
        e.preventDefault();

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/png, image/jpeg, image/webp"; 

        fileInput.onchange = async () => {
            const file = fileInput.files[0];
            if(!file) return;

            const maxSizeMB = 2;
            if(file.size > maxSizeMB * 1024 * 1024) {
                alert(`File is too large. Max size is ${maxSizeMB}MB`);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Image = reader.result;
                updateProfile({ avatar: base64Image });
            };
        };

        fileInput.click();
    };


    const handlePasswordUpdate = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        updateProfile({ password: password });
    };

    const handleAvatarRemove = (e) => {
        e.preventDefault();
        updateProfile({ avatar: "" });
    };

    return (
        <div className="space-y-8">
            {/* Display Name Section */}
            <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Display Name</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new display name"
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <button
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                        onClick={handleUsernameUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>

            {/* Avatar Section */}
            <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Avatar</h2>
                <div className="flex items-center space-x-6">
                    <Avatar size={100} user={authUser.user} />
                    <div className="flex space-x-3">
                        <button 
                            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
                            onClick={handleAvatarUpload}
                        >
                            Upload New
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                            onClick={handleAvatarRemove}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Password</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                    </div>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    <button 
                        className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
                        onClick={handlePasswordUpdate}
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;