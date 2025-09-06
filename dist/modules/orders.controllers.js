"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const getProductsAsync = async (req, res) => {
    try {
        const data = await prisma_1.prisma.product.findMany();
        res.status(200).json({
            success: true,
            message: "Success request",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Bad request",
        });
        console.error(error);
    }
};
const createProductAsync = async (req, res) => {
    try {
        const { name, price, img } = req.body;
        if (!name) {
            throw new Error("Name is required!");
        }
        else if (!price) {
            throw new Error("Price is required!");
        }
        else if (!img) {
            throw new Error("Img src is required!");
        }
        const newProduct = {
            img,
            name,
            price,
        };
        const createdProduct = await prisma_1.prisma.product.create({
            data: newProduct,
        });
        res.status(200).json({
            success: true,
            message: "Product created Successfully!",
            data: createdProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: !error ? "" : error,
        });
        console.error(error);
    }
};
const deleteProductAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const data = prisma_1.prisma.product.findMany();
        const productExists = await prisma_1.prisma.product.findUnique({
            where: { id: String(id) },
        });
        const deletedProduct = await prisma_1.prisma.product.delete({
            where: { id: String(id) },
        });
        if (!productExists) {
            throw new Error("This product doesnt exist!");
        }
        res.status(200).json({
            success: true,
            message: "Product deleted Successfully",
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: !error ? "" : error,
        });
        console.error(error);
    }
};
const modifyProductAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: !error ? "" : error,
        });
        console.error(error);
    }
};
exports.default = { getProductsAsync, createProductAsync, deleteProductAsync };
//# sourceMappingURL=orders.controllers.js.map