import React from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white">
            {/* Header */}
            <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide transition-transform transform hover:scale-105">
                Welcome to <span className="text-blue-500">Orderly Dashboard</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
                Manage your orders seamlessly with a modern interface.
            </p>

            {/* Login Button */}
            <button
                onClick={loginWithGoogle}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
                Login with Google
            </button>
        </div>
    );
};

export default AuthPage;
