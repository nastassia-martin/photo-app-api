/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('photo-api:profile_controller 📝')

/**
 * Get authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
    res.send({
        status: "success",
        data: null
    })
}
