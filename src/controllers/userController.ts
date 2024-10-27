import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getUsers = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allUsers = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
      orderBy: { id: "asc" },
    });

    return response
      .json({
        status: true,
        data: allUsers,
        message: "Users retrieved successfully",
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

export const createUser = async (request: Request, response: Response) => {
  try {
    console.log(request.body)
    const { name, email, password, role } = request.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: md5(password),
        role,
      },
    });

    let payload = JSON.stringify(newUser);
    let secretKey = process.env.JWT_SECRET_KEY;
    let token = sign(payload, secretKey || "ohio");

    return response
      .json({
        status: true,
        data: {
          newUser,
          token,
        },
        message: "User created successfully",
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

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        password: password ? md5(password) : findUser.password,
        role: role || findUser.role,
      },
    });

    return response
      .json({
        status: true,
        data: updatedUser,
        message: "User updated successfully",
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

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: "User not found" });

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: deletedUser,
        message: "User deleted successfully",
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

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const findUser = await prisma.user.findFirst({
      where: { email, password: md5(password) },
    });

    if (!findUser)
      return response
        .status(200)
        .json({ status: false, logged: false, message: "Invalid email or password" });

    let payload = JSON.stringify(findUser);
    let secretKey = process.env.JWT_SECRET_KEY;
    let token = sign(payload, secretKey || "ohio");

    return response
      .status(200)
      .json({ status: true, logged: true, message: "Login successful", token });
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
