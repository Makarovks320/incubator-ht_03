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
export const inputValidator =
    (req: Request, res: Response, next: NextFunction) => {
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                msg: error.msg,
                param: error.param
            };
        },
    });
    const result = myValidationResult(req).array();
    if (!result.length) {
        next();
    } else {
        const mergedByProperty = result.reduce((result, obj) => ({
            ...result,
            [obj.param]: {
                field: obj.param,
                message: result[obj.param] ? `${result[obj.param].message}; ${obj.msg}` : obj.msg
            }
        }), {});
        const errorsMessages: any = [];
        for (let obj in mergedByProperty) {
            //todo: Possible iteration over unexpected members, probably missing hasOwnProperty check
            errorsMessages.push({message: mergedByProperty[obj].message, field: mergedByProperty[obj].field})
        }
        res.status(400).send({errorsMessages: errorsMessages});
    }
};