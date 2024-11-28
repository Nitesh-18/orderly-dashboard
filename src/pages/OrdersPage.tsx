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
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold ">Orderly Dashboard</h1>

                <div className="p-4 w-1/4 bg-yellow-300 rounded shadow">
                    <h2 className="text-xl font-semibold">Total Order Value: <span className="text-green-500 font-mono">${totalOrderValue}</span></h2>
                </div>
            </header>

            <div className="flex justify-end mb-6">
                <div className="flex flex-col items-center justify-between bg-white p-4 rounded shadow mb-6 w-1/4">
                    {/* User Information */}
                    <img
                        src={user.avatar || '/avatar-image.png'} // Replace 'user.picture' with the correct field if it's different
                        alt={user.name}
                        className="w-24 h-30 rounded-full"
                    />
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Logout
                    </button>
                </div>

                {/* New Order Form */}
                <div className=" mb-6 ml-auto w-1/2">
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
