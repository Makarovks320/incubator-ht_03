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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        const array = JSON.parse(JSON.stringify(errors));// todo  спросить у ментора можно ли без этого
        const formattedErrors = array.errors.map(e  => {return {message: e.msg, field: e.param}});// todo спросить у
        // ментора про режим без any
        console.log(array);
        res.status(400).send({errorsMessages: formattedErrors});
    }
};