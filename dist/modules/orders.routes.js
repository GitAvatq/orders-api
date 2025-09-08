"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = __importDefault(require("./orders.controllers"));
const route = (0, express_1.Router)();
route.get("/get", orders_controllers_1.default.getProductsAsync);
route.post("/create", orders_controllers_1.default.createProductAsync);
route.delete("/delete/:id", orders_controllers_1.default.deleteProductAsync);
route.put("/update/:id", orders_controllers_1.default.modifyProductAsync);
exports.default = route;
//# sourceMappingURL=orders.routes.js.map