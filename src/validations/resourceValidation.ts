import { body, check } from 'express-validator';
export const resourceValidationRules = () => {
  return [
    check('url', 'resource url is required').not().isEmpty().trim(),
    check('expirationTime', 'expire time is required').not().isEmpty().trim(),
  ]
}