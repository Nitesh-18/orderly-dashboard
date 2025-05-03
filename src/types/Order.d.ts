export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product: "Product 1" | "Product 2" | "Product 3";
  quantity: number;
  order_value: number;
}
