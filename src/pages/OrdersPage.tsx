import React, { useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext";
import OrderList from "../components/OrderList";
import NewOrderForm from "../components/NewOrderForm";
import EditOrderModal from "../components/EditOrderModal";
import sampleData from "../assets/orders.json";
import { useAuth } from "../context/AuthContext";
import { Order } from "../types/Order";

const OrdersPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { orders, setOrders, totalOrderValue } = useOrders();
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);

    useEffect(() => setOrders(sampleData), [setOrders]);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-gray-800 to-black text-white">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold tracking-wide">
                    Orderly <span className="text-blue-500">Dashboard</span>
                </h1>

                {/* Total Order Value */}
                <div className="p-4 bg-gray-700 rounded shadow-lg">
                    <h2 className="text-xl font-semibold">
                        Total Order Value:{" "}
                        <span className="text-green-400 font-mono">${totalOrderValue}</span>
                    </h2>
                </div>
            </header>

            {/* User Info & New Order Form */}
            <div className="flex justify-between items-start mb-6">
                {/* User Information */}
                <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
                    <img
                        src={user.avatar || "/avatar-image.png"}
                        alt={user.name}
                        className="w-24 h-24 rounded-full"
                    />
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                    >
                        Logout
                    </button>
                </div>

                {/* New Order Form */}
                <div className="w-2/3 bg-transparent p-6 rounded-lg shadow-lg">
                    <NewOrderForm />
                </div>
            </div>

            {/* Order List */}
            <OrderList orders={orders} onEditOrder={setEditingOrder} />

            {/* Edit Order Modal */}
            {editingOrder && (
                <EditOrderModal
                    order={editingOrder}
                    onClose={() => setEditingOrder(null)}
                />
            )}
        </div>
    );
};

export default OrdersPage;
