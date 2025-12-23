import { pool } from "../../config/db";

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export const createOrder = async (

  items: OrderItem[],
  totalAmount: number
) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Insert into orders
    const [orderResult]: any = await connection.query(
      "INSERT INTO orders (total_amount) VALUES (?)",
      [totalAmount]
    );

    const orderId = orderResult.insertId;

    // 2️⃣ Insert order items
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items 
         (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getAllOrders = async () => {
  const [orders]: any = await pool.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );

  for (const order of orders) {
    const [items] = await pool.query(
      `SELECT product_id, quantity, price
       FROM order_items
       WHERE order_id = ?`,
      [order.id]
    );

    order.items = items;
  }

  return orders;
};
