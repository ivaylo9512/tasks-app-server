import { check } from 'express-validator';

export const createValidationRules = [
    check('name', 'You must provide a name.').notEmpty(),
    check('state', 'You must provide a state.').notEmpty().bail().matches(/\b(?:event|daily|goals)\b/),
]
export const createManyValidationRules = [
    check('taks.*.name', 'You must provide a name.').notEmpty(),
    check('taks.*.state', 'You must provide a state.').notEmpty().bail().matches(/\b(?:event|daily|goals)\b/),
]
export const updateValidationRules = [
    check('id', 'You must provide an id.').notEmpty().bail().isInt().withMessage('You must provide id as a whole number.'),
    check('name', 'You must provide a name.').notEmpty(),
    check('state', 'You must provide a name.').notEmpty().bail().matches(/\b(?:event|daily|goals)\b/),
]