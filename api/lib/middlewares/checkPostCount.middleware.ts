import { NextFunction, RequestHandler, Request, Response } from "express";
import { config } from "../config";


export const checkPostCount: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    const { limit } = request.params;
    const parsedValue = parseInt(limit, 10);
    if (isNaN(parsedValue) || parsedValue >= config.supportedPostCount) {
        return response.status(400).send('Brak lub niepoprawna wartość!');
    }
    next();
};