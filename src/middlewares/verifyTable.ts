import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/** Create schema for adding a new table */
const addTableSchema = Joi.object({
    number: Joi.number().required(), // Nomor meja wajib
    isAvailable: Joi.boolean().optional(), // Ketersediaan meja opsional
});

/** Create schema for updating a table, all fields optional */
const updateTableSchema = Joi.object({
    number: Joi.number().optional(), // Nomor meja opsional
    isAvailable: Joi.boolean().optional(), // Ketersediaan meja opsional
});
        
/** Middleware to verify table creation */
export const verifyAddTable = (request: Request, response: Response, next: NextFunction) => {
    const { error } = addTableSchema.validate(request.body, { abortEarly: false });

    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(', '),
        });
    }
    return next();
};

/** Middleware to verify table updates */
export const verifyUpdateTable = (request: Request, response: Response, next: NextFunction) => {
    const { error } = updateTableSchema.validate(request.body, { abortEarly: false });

    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(', '),
        });
    }
    return next();
};
