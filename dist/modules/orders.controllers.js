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
        const { name, price, img, id, quantity } = req.body;
        if (!name) {
            throw new Error("Name is required!");
        }
        else if (!price) {
            throw new Error("Price is required!");
        }
        else if (!img) {
            throw new Error("Img src is required!");
        }
        else if (!quantity) {
            throw new Error("Img src is required!");
        }
        const newProduct = {
            img,
            name,
            price,
            quantity,
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
        res.status(500).json({
            success: false,
            message: error?.message || "Internal server error",
        });
        console.error(error);
    }
};
const deleteProductAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const productId = String(id);
        const productExists = await prisma_1.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exists!",
            });
        }
        const deletedProduct = await prisma_1.prisma.product.delete({
            where: { id: productId },
        });
        res.status(200).json({
            success: true,
            message: "Product deleted Successfully",
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message || "Internal server error",
        });
        console.error(error);
    }
};
const modifyProductAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const productId = String(id);
        if (!name ||
            typeof name !== "string" ||
            !quantity ||
            typeof quantity !== "number") {
            return res.status(400).json({
                success: false,
                message: "Invalid product name",
            });
        }
        const productExists = await prisma_1.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist!",
            });
        }
        const duplicate = await prisma_1.prisma.product.findFirst({
            where: {
                name,
                NOT: { id: productId },
            },
        });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Product with this name already exists!",
            });
        }
        const updateProduct = await prisma_1.prisma.product.update({
            where: { id: productId },
            data: { name, quantity },
        });
        res.status(200).json({
            success: true,
            message: "Success update",
            data: updateProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message || "Internal server error",
        });
        console.error(error);
    }
};
exports.default = {
    getProductsAsync,
    createProductAsync,
    deleteProductAsync,
    modifyProductAsync,
};
//# sourceMappingURL=orders.controllers.js.map