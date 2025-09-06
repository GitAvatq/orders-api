import { Router } from "express";
import ordersControllers from "./orders.controllers";

const route = Router();

route.get("/get", ordersControllers.getProductsAsync);
route.post("/create", ordersControllers.createProductAsync);
route.delete("/delete/:id", ordersControllers.deleteProductAsync);
// route.put("/update/:id")

export default route;
