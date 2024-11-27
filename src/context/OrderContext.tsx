import React, { createContext, useContext, useState } from "react";
import { Order } from "../types/Order";

interface OrderContextType {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    addOrder: (order: Order) => void;
    editOrder: (id: string, updatedOrder: Order) => void;
    deleteOrder: (id: string) => void;
    totalOrderValue: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const addOrder = (order: Order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    const editOrder = (id: string, updatedOrder: Order) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === id ? updatedOrder : order))
        );
    };

    const deleteOrder = (id: string) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    const totalOrderValue = orders.reduce((sum, order) => sum + order.order_value, 0);

    return (
        <OrderContext.Provider
            value={{ orders, setOrders, addOrder, editOrder, deleteOrder, totalOrderValue }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used within an OrderProvider");
    return context;
};
