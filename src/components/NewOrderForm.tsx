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
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>
            <div>
                <label className="block text-gray-700">Customer Name</label>
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700">Customer Email</label>
                <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-gray-700">Product</label>
                <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="Product 1">Product 1</option>
                    <option value="Product 2">Product 2</option>
                    <option value="Product 3">Product 3</option>
                </select>
            </div>
            <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    min="1"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Add Order
            </button>
        </form>
    );
};

export default NewOrderForm;
