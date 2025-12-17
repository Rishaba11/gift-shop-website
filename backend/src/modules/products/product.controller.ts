import { Request, Response } from "express";
import { getAllProducts } from "./product.service";

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
