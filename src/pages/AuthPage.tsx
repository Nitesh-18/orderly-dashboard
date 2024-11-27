import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Orderly Dashboard</h1>
            <button
                onClick={loginWithGoogle}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                Login with Google
            </button>
        </div>
    );
};

export default AuthPage;
