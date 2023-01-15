import {body} from "express-validator";

export const websiteUrlValidation = body('websiteUrl')
    .trim()
    .isURL().withMessage('websiteUrl should be url')
    .notEmpty().withMessage('should be notEmpty');

export const nameValidation = body('name')
    .trim()
    .isLength({max: 15}).withMessage('max length is 15')
    .notEmpty().withMessage('should be notEmpty');

export const titleValidation =  body('title')
    .trim()
    .isLength({max: 30}).withMessage('max length: 30')
    .notEmpty().withMessage('should be notEmpty');

export const shortDescriptionValidation =  body('shortDescription')
    .trim()
    .isLength({max: 100}).withMessage('max length: 100')
    .notEmpty().withMessage('should be notEmpty');

export const contentValidation =  body('content')
    .trim()
    .isLength({max: 1000}).withMessage('max length: 1000')
    .notEmpty().withMessage('should be notEmpty');