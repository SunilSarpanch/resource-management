import { body, check } from 'express-validator';
export const signupValidationRules = () => {
  return [
    check('name', 'name is required').not().isEmpty().trim(),
    check('email', 'email must be a valid email address').isEmail(),
    check('password', 'password must be at least 5 chars long').isLength({ min: 5 }),
  ]
}

export const loginValidationRules = () => {
  return [
    check('email', 'please provide valid email address').isEmail(),
    check('password', 'please provide password').not().isEmpty().trim(),
  ]
}

export const updateValidationRules = () => {
  return [
    check('name', 'name is required').optional().not().isEmpty().trim(),
    check('email', 'email must be a valid email address').optional().isEmail(),
    check('password', 'password must be at least 5 chars long').optional().isLength({ min: 5 }),
  ]
}