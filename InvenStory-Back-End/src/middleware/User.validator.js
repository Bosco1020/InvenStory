import * as expressValidator from "express-validator";
            
export default class UserValidator {
    static validateUser = () => {
        try {
            return [
                expressValidator.body("name").notEmpty().isString(),
                expressValidator.body("email").notEmpty().isString().matches(/^[\w\.]+@([\w-]+\.+[\w-])+[\w-]{1,4}$/),
                expressValidator
                    .body("password")
                    .notEmpty()
                    .isString()
                    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
                expressValidator
                    .body("role")
                    .isInt()
                    .optional(),
                expressValidator.body("assignedItems").isArray().optional(),
                UserValidator.handleValidationErrors,
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