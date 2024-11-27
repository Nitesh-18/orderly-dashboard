import React from 'react';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Public route for login */}
                <Route
                    path="/"
                    element={!user ? <AuthPage /> : <Navigate to="/home" />}
                />
                {/* Protected route for orders */}
                <Route
                    path="/home"
                    element={user ? <OrdersPage /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
