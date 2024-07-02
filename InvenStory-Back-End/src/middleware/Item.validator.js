import * as expressValidator from "express-validator";
            
export default class ItemValidator {
    static validateItem = () => {
        try {
            return [
                expressValidator
                    .body("_id").isMongoId().optional(),
                expressValidator.body("name").notEmpty().isString(),
                expressValidator.body("description").notEmpty().isString(),
                expressValidator
                    .body("tagList")
                    .optional()
                    .isArray(),
                ItemValidator.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}