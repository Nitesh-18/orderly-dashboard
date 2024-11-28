import React, { useState } from "react";
import { useOrders } from "../context/OrderContext";

const NewOrderForm: React.FC = () => {
    const { addOrder } = useOrders();
    const [formData, setFormData] = useState({
        id: "",
        customer_name: "",
        customer_email: "",
        product: "Product 1",
        quantity: 1,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addOrder({
            ...formData,
            id: Date.now().toString(),
            quantity: Number(formData.quantity),
            order_value: calculateOrderValue(formData.product, Number(formData.quantity)),
        });
        setFormData({
            id: "",
            customer_name: "",
            customer_email: "",
            product: "Product 1",
            quantity: 1,
        });
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
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-700 p-6 rounded-lg shadow-lg">
            {/* Form Title */}
            <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
                Create New Order
            </h2>
    
            {/* Customer Name and Email */}
            <div className="flex gap-4 justify-between">
                <div className="w-full">
                    <label className="block text-gray-300 mb-2">Customer Name</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter customer's name"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-300 mb-2">Customer Email</label>
                    <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter customer's email"
                    />
                </div>
            </div>
    
            {/* Product and Quantity */}
            <div className="flex gap-4 justify-between">
                <div className="w-1/3">
                    <label className="block text-gray-300 mb-2">Product</label>
                    <select
                        name="product"
                        value={formData.product}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="Product 1">Product 1</option>
                        <option value="Product 2">Product 2</option>
                        <option value="Product 3">Product 3</option>
                    </select>
                </div>
                <div className="w-1/4">
                    <label className="block text-gray-300 mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        min="1"
                    />
                </div>
            </div>
    
            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 transform hover:scale-105 transition-all duration-300"
            >
                Add Order
            </button>
        </form>
    );
    
};

export default NewOrderForm;
