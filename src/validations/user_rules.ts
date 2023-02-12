/**
 * Validation rules for user
 */

import { body } from 'express-validator'
import prisma from '../prisma'

/**
 * email - string required must be a valid email and not already exist
 * password - string required must be at least 6 chars long
 * first_name - string required must be at least 3 chars long
 * last_name - string required must be at least 3 chars long
 */

export const createUserRules = [
    body('first_name').isString().bail().isLength({ min: 3 }),
    body('last_name').isString().bail().isLength({ min: 3 }),
    body('email').isEmail().custom(async value => {
        // Check if email already exists
        const user = await prisma.user.findUnique({
            where: {
                email: value,
            }
        })
        // if user's email exists then reject the registration attempt
        if (user) {
            return Promise.reject("This email already exists")
        }
    }),
    body('password').isString().isLength({ min: 6 })


]