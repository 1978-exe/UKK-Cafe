import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

/** Get all tables */
export const getTables = async (request: Request, response: Response) => {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { id: "asc" },
    });

    return response
      .json({
        status: true,
        data: tables,
        message: "Tables retrieved successfully",
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

/** Create a new table */
export const createTable = async (request: Request, response: Response) => {
  try {
    const { number, isAvailable } = request.body;

    const newTable = await prisma.table.create({
      data: {
        number,
        isAvailable: isAvailable ?? true, // default to true if not provided
      },
    });

    return response
      .json({
        status: true,
        data: newTable,
        message: "Table created successfully",
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

/** Update an existing table */
export const updateTable = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { number, isAvailable } = request.body;

    const findTable = await prisma.table.findFirst({ where: { id: Number(id) } });
    if (!findTable)
      return response
        .status(200)
        .json({ status: false, message: "Table not found" });

    const updatedTable = await prisma.table.update({
      where: { id: Number(id) },
      data: {
        number: number || findTable.number,
        isAvailable: isAvailable !== undefined ? isAvailable : findTable.isAvailable,
      },
    });

    return response
      .json({
        status: true,
        data: updatedTable,
        message: "Table updated successfully",
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

/** Delete a table */
export const deleteTable = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findTable = await prisma.table.findFirst({ where: { id: Number(id) } });
    if (!findTable)
      return response
        .status(200)
        .json({ status: false, message: "Table not found" });

    const deletedTable = await prisma.table.delete({
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: deletedTable,
        message: "Table deleted successfully",
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
