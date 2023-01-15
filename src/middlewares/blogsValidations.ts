import {body} from "express-validator";

export const websiteUrlValidation = body('websiteUrl')
    .trim()
    .isURL().withMessage('websiteUrl should be url')
    .notEmpty().withMessage('should be notEmpty');

export const nameValidation = body('name')
    .trim()
    .isLength({max: 15}).withMessage('max length is 15')
    .notEmpty().withMessage('should be notEmpty');