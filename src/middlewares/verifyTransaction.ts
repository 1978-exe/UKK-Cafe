import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// Schema untuk detail item pesanan
const detailSchema = Joi.object({
    quantity: Joi.number().min(1).required(),
    menuItemId: Joi.number().min(1).required() // Sesuaikan dengan `menuItemId` di controller
});

/** Schema untuk validasi data saat menambahkan transaksi */
const addDataSchema = Joi.object({
    customerName: Joi.string().required(),
    tableNumber: Joi.number().required(),
    totalAmount: Joi.number().min(1).required(),
    cashierId: Joi.number().min(1).required(),
    status: Joi.string().valid('PAID', 'UNPAID').required(),
    orderItems: Joi.array().items(detailSchema).min(1).required()
});

/** Schema untuk validasi data saat mengedit transaksi */
const updateDataSchema = Joi.object({
    customerName: Joi.string().optional(),
    tableNumber: Joi.number().optional(),
    totalAmount: Joi.number().min(1).optional(),
    status: Joi.string().valid('PAID', 'UNPAID').optional(),
    orderItems: Joi.array().items(detailSchema).min(1).optional()
});

// Middleware untuk memvalidasi penambahan transaksi baru
export const verifyAddTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { error } = addDataSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(", ")
        });
    }
    next();
};

// Middleware untuk memvalidasi pengeditan transaksi
export const verifyEditTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateDataSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(", ")
        });
    }
    next();
};
