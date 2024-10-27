import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Transaction
// Create Transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
      const { customerName, tableNumber, totalAmount, cashierId, orderItems, status } = req.body;

      const newTransaction = await prisma.transaction.create({
          data: {
              customerName,
              tableNumber,
              totalAmount,
              cashierId,
              status, // Menambahkan status ke dalam data
              orderItems: {
                  create: orderItems.map((item: any) => ({
                      menuItemId: item.menuItemId,
                      quantity: item.quantity,
                  })),
              },
          },
          include: { orderItems: true, table: true },
      });

      return res.status(200).json({
          status: true,
          message: "Transaction created successfully",
          data: newTransaction,
      });

  } catch (error) {
      return res.status(500).json({
          status: false,
          message: "Error creating transaction",
          error,
      });
  }
};


// Get All Transactions
export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                orderItems: {
                    include: { menuItem: true },
                },
                table: true,
            },
            orderBy: { id: "asc" },
        });

        return res.status(200).json({
            status: true,
            message: "Transactions retrieved successfully",
            data: transactions,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error retrieving transactions",
            error,
        });
    }
};

// Update Transaction
export const updateTransaction = async (req: Request, res: Response) => {
  try {
      const id = Number(req.params.id);
      const { customerName, tableNumber, totalAmount, orderItems, status } = req.body;

      // Cek apakah ada transaksi dengan id tersebut
      const existingTransaction = await prisma.transaction.findUnique({
          where: { id },
          include: { orderItems: true },
      });

      if (!existingTransaction) {
          return res.status(404).json({
              status: false,
              message: "Transaction not found",
          });
      }

      // Persiapkan data untuk diperbarui
      const updateData: any = {
          customerName,
          tableNumber,
          totalAmount,
          // Tambahkan status jika ada di request
          ...(status && { status }) // Memasukkan status hanya jika ada dalam body
      };

      // Hanya masukkan orderItems jika ada
      if (orderItems) {
          updateData.orderItems = {
              updateMany: orderItems.map((item: any) => ({
                  where: { id: item.id },
                  data: { quantity: item.quantity },
              })),
          };
      }

      const transaction = await prisma.transaction.update({
          where: { id },
          data: updateData,
          include: { orderItems: true },
      });

      return res.status(200).json({
          status: true,
          message: "Transaction updated successfully",
          data: transaction,
      });

  } catch (error) {
      console.error("Error updating transaction:", error); // Log error
      return res.status(500).json({
          status: false,
          message: `Error updating transaction ${error}` // Menampilkan pesan error yang lebih informatif
      });
  }
};



// Delete Transaction
export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await prisma.orderItem.deleteMany({
            where: { transactionId: id },
        });

        const deletedTransaction = await prisma.transaction.delete({
            where: { id },
        });

        return res.status(200).json({
            status: true,
            message: "Transaction deleted successfully",
            data: deletedTransaction,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error deleting transaction",
            error,
        });
    }
};
