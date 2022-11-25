import {NextFunction, Request, Response} from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) res.status(401).send();
    req.headers.authorization === 'Basic YWRtaW46cXdlcnR5' ? next()
        : res.status(401).send();
};