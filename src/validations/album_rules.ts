/**
 * Validation rules for albums
 */
import { body } from 'express-validator'

/**
 * title string required must be at least 3 chars long 
 * same rule can be used in both post & patch
 */

export const albumRules = [
    body('title').isString().trim().bail().isLength({ min: 3 }).withMessage("Your title is too short!")
]