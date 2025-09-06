import { Router } from "express";
import orderRouter from "../modules/orders.routes";

const route = Router();

route.use("/orders", orderRouter);

export default route;
