import React, { useState, useMemo, useEffect } from "react";
import { Order } from "../types/Order";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import { useOrders } from "../context/OrderContext";

interface OrderListProps {
    orders: Order[];
    onEditOrder: (order: Order) => void;
}

const ITEMS_PER_PAGE = 10;

const OrderList: React.FC<OrderListProps> = ({ orders, onEditOrder }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { deleteOrder } = useOrders();

    // Reset current page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Filter orders based on the search term
    const filteredOrders = useMemo(() => {
        return orders.filter(
            (order) =>
                order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const displayedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, endIndex);
    }, [filteredOrders, currentPage]);

    return (
        <div>
            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Customer Email</th>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Order Value</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="border px-4 py-2">{order.id}</td>
                                <td className="border px-4 py-2">{order.customer_name}</td>
                                <td className="border px-4 py-2">{order.customer_email}</td>
                                <td className="border px-4 py-2">{order.product}</td>
                                <td className="border px-4 py-2">{order.quantity}</td>
                                <td className="border px-4 py-2">${order.order_value}</td>
                                <td className="border px-4 py-2 flex space-x-2">
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => onEditOrder(order)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default OrderList;
