import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <OrderProvider>
                <App />
            </OrderProvider>
        </AuthProvider>
    </React.StrictMode>
);
