/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { newUser } from '../services/user_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('photo-api:register_controller 📝')

/**
 * Register a new user
 *  * @todo validate incoming data and bail if validation fails
 * router.post('/register', [], register)
 */
export const register = async (req: Request, res: Response) => {

    // Check for validation errors
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }

    // Get only validated data from request
    const validatedData = matchedData(req)
    console.log("validatedData:", validatedData)

    //Calculate salt & hash for the password
    const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
    console.log("Hashed password:", hashedPassword)

    // Replace password with hashed password
    validatedData.password = hashedPassword

    //Import user from service & store the user in the db
    try {
        const user = await newUser({
            first_name: validatedData.first_name,
            last_name: validatedData.last_name,
            email: validatedData.email,
            password: validatedData.password,
        })

        // Respond with 201 + success message, password IS NOT included
        res.status(201).send({
            status: "success",
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        })

    } catch (err) {
        // Or internal server error
        return res.status(500).send({ status: "error", message: "Could not create user in database" })
    }
}

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
