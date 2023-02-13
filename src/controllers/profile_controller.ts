/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { getUserbyEmail } from '../services/user_service'

// Create a new debug instance
const debug = Debug('photo-api:profile_controller 📝')

/**
 * Get authenticated user's profile
 * 
 * @todo set up a route in index.ts to /get user profile ✅
 * @todo set up req.token globally
 * @todo change tsconfg to reflect global scope
 */
export const getProfile = async (req: Request, res: Response) => {
    // send if user has successfully authenticated

    res.send({
        status: "success",
        data: req.user
    })
}
