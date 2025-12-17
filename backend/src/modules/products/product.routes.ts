import { Router } from "express";
import { fetchProducts } from "./product.controller";

const router = Router();

router.get("/", fetchProducts);

export default router;
