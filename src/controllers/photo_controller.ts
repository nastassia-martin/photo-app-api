/**
 * Photo Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getPhotos } from '../services/photo_service'
import prisma from '../prisma'
import { getProfile } from './profile_controller'
import { getUserbyEmail } from '../services/user_service'

// Create a new debug instance
const debug = Debug('photo-api:photo_controller 📝')

/**
 * Get all photos from an authenticated user
 * @todo: test that you get anything from postmantest that you get anything from postman
 * @todo: move prisma logic to services
 * 
 */
export const index = async (req: Request, res: Response) => {
    //check that the user is verified  
    if (req.token!.sub) {
        console.log("req.token!.sub: ", req.token!.sub)
        try {
            const photos = await getPhotos()
            res.send({
                data: photos,
            })
            console.log("profile_controller", req.token)
        } catch (err) {
            res.status(500).send({ message: "Something went wrong" })
        }
    }
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
