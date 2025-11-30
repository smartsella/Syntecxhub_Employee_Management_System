import { body, validationResult } from "express-validator";

const validateEmployee = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Role must be between 2 and 50 characters")
    .trim(),

  body("department")
    .notEmpty()
    .withMessage("Department is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Department must be between 2 and 50 characters")
    .trim(),

  body("salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .isFloat({ min: 0 })
    .withMessage("Salary cannot be negative"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validateEmployee;
