import { validationResult, ValidationError } from 'express-validator';

export const validate = (req, res, next) => {
    const errors: any = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ field: err.path, value: err.value, error: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }