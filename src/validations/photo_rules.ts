/**
 * Validation rules for photos
 */

import { body } from 'express-validator'
import prisma from '../prisma'

/**
 * title string required must be at least 3 chars long 
 * url string required must be a url
 * comment string must be at least 3 chars long
 */

export const createPhotoRules = [
    body('title').isString().trim().bail().isLength({ min: 3 }).withMessage("Your title is too short!"),
    body('url').isURL().bail().isLength({ min: 3 }).withMessage("Your photo must be a URL"),
    body('comment').isString().trim().bail().isLength({ min: 3 }).withMessage("Your comment is too short!")
]

export const updatePhotoRules = [
    body('title').optional().isString().bail().isLength({ min: 3 }).withMessage("Your title is too short!"),
    body('url').optional().isURL().bail().isLength({ min: 3 }).withMessage("Your photo must be a URL"),
    body('comment').optional().isString().bail().isLength({ min: 3, max: 256 }).withMessage("Your comment is too short!")
]