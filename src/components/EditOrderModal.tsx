import React, { useState } from "react";
import { Order } from "../types/Order";
import { useOrders } from "../context/OrderContext";

interface EditOrderModalProps {
    order: Order;
    onClose: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose }) => {
    const { editOrder } = useOrders();
    const [formData, setFormData] = useState(order);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editOrder(order.id, {
            ...formData,
            quantity: Number(formData.quantity),
            order_value: calculateOrderValue(formData.product, Number(formData.quantity)),
        });
        onClose();
    };

    const calculateOrderValue = (product: string, quantity: number) => {
        const prices: Record<string, number> = {
            "Product 1": 29,
            "Product 2": 49,
            "Product 3": 149,
        };
        return prices[product] * quantity;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white">
                {/* Modal Title */}
                <h2 className="text-2xl font-extrabold mb-6 text-center">
                    Edit Order
                </h2>
    
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Name */}
                    <div>
                        <label className="block text-gray-300 mb-2">Customer Name</label>
                        <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter customer's name"
                        />
                    </div>
    
                    {/* Customer Email */}
                    <div>
                        <label className="block text-gray-300 mb-2">Customer Email</label>
                        <input
                            type="email"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter customer's email"
                        />
                    </div>
    
                    {/* Product Selection */}
                    <div>
                        <label className="block text-gray-300 mb-2">Product</label>
                        <select
                            name="product"
                            value={formData.product}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="Product 1">Product 1</option>
                            <option value="Product 2">Product 2</option>
                            <option value="Product 3">Product 3</option>
                        </select>
                    </div>
    
                    {/* Quantity */}
                    <div>
                        <label className="block text-gray-300 mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            min="1"
                        />
                    </div>
    
                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-500 transform hover:scale-105 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default EditOrderModal;
