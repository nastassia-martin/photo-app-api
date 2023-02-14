/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('photo-api:photo_controller 📝')

/**
 * Get all photos from an authenticated user
 * @todo: test that you get anything from postmantest that you get anything from postman
 * @todo: find user by id
 * @todo: 
 */
export const index = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}

/**
 * Get a single photo from an authenticated user
 */
export const show = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}

/**
 * Create a photo from an authenticated user
 */
export const store = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}

/**
 * Update a photo from an authenticated user
 */
export const update = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}

/**
 * Delete a photo from an authenticated user, including links to album(s), but not album(s) itself
 */
export const destroy = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}
