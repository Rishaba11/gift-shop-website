import { Router } from "express";
import { placeOrder, fetchOrders } from "./order.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// 🔐 Protected routes
router.post("/", authenticate, placeOrder);
router.get("/", authenticate, fetchOrders);

export default router;
