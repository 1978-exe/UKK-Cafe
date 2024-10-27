import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/** create schema when add new user's data, all of fields have to be required */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'KASIR', 'MANAJER').required(), // Tambahkan validasi role
});

/** create schema when edit user's data, all of fields allow and optional to send in request */
const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    role: Joi.string().valid('ADMIN', 'KASIR', 'MANAJER').optional(), // Tambahkan validasi role untuk edit
});

/** create schema when authentication */
const authSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const verifyAddUser = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false });

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(),
        });
    }
    return next();
};

export const verifyEditUser = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = updateDataSchema.validate(request.body, { abortEarly: false });

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(),
        });
    }
    return next();
};

export const verifyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = authSchema.validate(request.body, { abortEarly: false });

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join(),
        });
    }
    return next();
};
