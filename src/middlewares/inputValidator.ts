import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

// типы для режима без any
// type error = {
//     message: string,
//     field: string
// }
// type initError = {
//     msg: string,
//     param: string,
//     location: string
// }
export const inputValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);// todo как получать разные тексты на разные ошибки
    if (result.isEmpty()) {
        next();
    } else {
        const array = JSON.parse(JSON.stringify(result));// todo как сделать без этого
        const mergedByProperty = array.errors.reduce((result, obj) => ({
            ...result,
            [obj.param]: {
                ...result[obj.param],
                ...obj
            }
        }), {});
        const errorsMessages: any = [];
        for (let obj in mergedByProperty) {
            errorsMessages.push({message: mergedByProperty[obj].msg, field: mergedByProperty[obj].param})
        }
        res.status(400).send({errorsMessages: errorsMessages});
    }
};