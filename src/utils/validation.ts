export const validateOrder = (order: any): boolean => {
  const { id, customer_name, customer_email, product, quantity } = order;

  // Validate Order ID
  if (!id || typeof id !== "string") return false;

  // Validate Customer Name
  if (!customer_name || customer_name.length < 3) return false;

  // Validate Customer Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customer_email)) return false;

  // Validate Product
  const validProducts = ["Product 1", "Product 2", "Product 3"];
  if (!validProducts.includes(product)) return false;

  // Validate Quantity
  if (!quantity || quantity <= 0) return false;

  return true;
};

export const calculateOrderValue = (
  product: string,
  quantity: number
): number => {
  const productPrices: Record<string, number> = {
    "Product 1": 29,
    "Product 2": 49,
    "Product 3": 149,
  };
  return productPrices[product] * quantity;
};
