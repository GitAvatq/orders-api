import { Request, Response } from "express";
import { prisma } from "../config/prisma";

const getProductsAsync = async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany();

    res.status(200).json({
      success: true,
      message: "Success request",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
    console.error(error);
  }
};

const getDetailsAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = String(id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const createProductAsync = async (req: Request, res: Response) => {
  try {
    const { name, price, img, id, quantity } = req.body;
    if (!name) {
      throw new Error("Name is required!");
    } else if (!price) {
      throw new Error("Price is required!");
    } else if (!img) {
      throw new Error("Img src is required!");
    } else if (!quantity) {
      throw new Error("Img src is required!");
    }
    const newProduct = {
      img,
      name,
      price,
      quantity,
    };

    const createdProduct = await prisma.product.create({
      data: newProduct,
    });

    res.status(200).json({
      success: true,
      message: "Product created Successfully!",
      data: createdProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
    console.error(error);
  }
};

const deleteProductAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = String(id);

    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product does not exists!",
      });
    }
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
      data: deletedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
    console.error(error);
  }
};

const modifyProductAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productId = String(id);

    if (
      !name ||
      typeof name !== "string" ||
      !quantity ||
      typeof quantity !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product name",
      });
    }

    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist!",
      });
    }

    const duplicate = await prisma.product.findFirst({
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
    const updateProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, quantity },
    });

    res.status(200).json({
      success: true,
      message: "Success update",
      data: updateProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
    console.error(error);
  }
};

export default {
  getProductsAsync,
  createProductAsync,
  deleteProductAsync,
  modifyProductAsync,
  getDetailsAsync,
};
