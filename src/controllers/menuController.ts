import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global";
const prisma = new PrismaClient({ errorFormat: "pretty" });

/** Get all menu items */
export const getMenuItems = async (request: Request, response: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { id: "asc" },
    });

    return response
      .json({
        status: true,
        data: menuItems,
        message: "Menu items retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

/** Create a new menu item */
export const createMenuItem = async (request: Request, response: Response) => {
  try {
    const { name, price, category, available} = request.body;
    
    let filename = ""
    if (request.file) filename = request.file.filename

    const isAvailable = (available === "true" || available === true)

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        price: parseFloat(price),
        category,
        available: isAvailable, // default to true if not provided
        image : filename // menyimpan URL gambar
      }
    });

    return response
      .json({
        status: true,
        data: newMenuItem,
        message: "Menu item created successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

/** Update an existing menu item */
export const updateMenuItem = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, price, category, available, image } = request.body;

    const findMenuItem = await prisma.menuItem.findFirst({ where: { id: Number(id) } });
    if (!findMenuItem)
      return response
        .status(200)
        .json({ status: false, message: "Menu item not found" });

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: {
        name: name || findMenuItem.name,
        price: price ? parseFloat(price) : findMenuItem.price,
        category: category || findMenuItem.category,
        available: available !== undefined ? available : findMenuItem.available,
        image: image || findMenuItem.image, // memperbarui gambar
      },
    });

    return response
      .json({
        status: true,
        data: updatedMenuItem,
        message: "Menu item updated successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

/** Delete a menu item */
export const deleteMenuItem = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findMenuItem = await prisma.menuItem.findFirst({ where: { id: Number(id) } });
    if (!findMenuItem)
      return response
        .status(200)
        .json({ status: false, message: "Menu item not found" });

    const deletedMenuItem = await prisma.menuItem.delete({
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: deletedMenuItem,
        message: "Menu item deleted successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
