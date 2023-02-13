/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { newUser, getUserbyEmail } from '../services/user_service'
import prisma from '../prisma'
import { JWTPayload } from '../types'

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
            password: validatedData.password, //abc123
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
 * Login a user
 */

export const login = async (req: Request, res: Response) => {
    // user puts in email & password in request
    const { email, password } = req.body

    // find the user via their email, otherwise: not today!
    const user = await getUserbyEmail(email)

    // if no user, then throw 401, not found, return so no further messages are sent
    if (!user) {
        return res.status(401).send({
            status: "fail",
            message: "User not found"
        })
    }
    // verify user password against hash, otherise: not today
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        return res.status(401).send({
            status: "fail",
            message: "Authhorization required"
        })
    }
    //construct jwt-payload

    const payload: JWTPayload = {
        sub: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }

    //sign payload with secret and get access token
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return res.status(500).send({
            status: "fail",
            message: "No access token defined"
        })
    }
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    // respond with access token
    res.send({
        status: "success",
        data: access_token,
    })
}