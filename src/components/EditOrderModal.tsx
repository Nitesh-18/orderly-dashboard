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
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Order</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
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
