import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/** Create schema for adding a new food item, all fields are required */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
    category: Joi.string().required(),
    available: Joi.boolean().optional(),
    
});

/** Create schema for editing food item, all fields are optional */
const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().min(1).optional(),
    category: Joi.string().optional(),
    available: Joi.boolean().optional(),
    
});

/** Middleware to validate data when adding a food item */
export const verifyAddFood = (request: Request, response: Response, next: NextFunction) => {
    const { error } = addDataSchema.validate(request.body, { abortEarly: false });

    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(),
        });
    }
    return next();
};

/** Middleware to validate data when editing a food item */
export const verifyEditFood = (request: Request, response: Response, next: NextFunction) => {
    const { error } = updateDataSchema.validate(request.body, { abortEarly: false });

    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(),
        });
    }
    return next();
};
