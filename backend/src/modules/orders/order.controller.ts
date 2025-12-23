import { Request, Response } from "express";
import { createOrder } from "./order.service";
import { getAllOrders } from "./order.service";


export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const orderId = await createOrder(items, totalAmount);

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
};
export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
