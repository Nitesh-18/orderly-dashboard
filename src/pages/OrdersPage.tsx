import React, { useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext";
import OrderList from "../components/OrderList";
import NewOrderForm from "../components/NewOrderForm";
import EditOrderModal from "../components/EditOrderModal";
import sampleData from "../assets/orders.json"; 
import { useAuth } from "../context/AuthContext";
import { Order } from "../types/Order";

const OrdersPage: React.FC = () => {
    const { logout } = useAuth();
    const { orders, setOrders, totalOrderValue } = useOrders();
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);

    useEffect(() => setOrders(sampleData), [setOrders]);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold ">Orderly Dashboard</h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Logout
                </button>
            </div>

            {/* Total Order Value */}
            <div className="mb-6 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold">Total Order Value: ${totalOrderValue}</h2>
            </div>

            {/* New Order Form */}
            <div className="mb-6">
                <NewOrderForm />
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
