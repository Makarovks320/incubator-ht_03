import {NextFunction, Request, Response} from "express";

export function checkIdParam (req: Request, res: Response, next: NextFunction) {
        req.params.id ? next() : res.status(400).send({
            errorsMessages: [
                {
                    message: 'param is required',
                    param: 'id'
                }
            ]
        })
    }