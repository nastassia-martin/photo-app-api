/**
 * Photo Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getPhotos, createPhoto } from '../services/photo_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('photo-api:photo_controller 📝')

/**
 * Get all photos from an authenticated user
 * 
 */
export const index = async (req: Request, res: Response) => {
    //check that the user is verified  with the req token
    const photos = await getPhotos(req.token!.sub)
    res.send({
        status: "success",
        data: photos
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
    // validate photo 
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        })
    }
    const photoInput = req.body

    try {
        const newPhoto = await createPhoto(photoInput, Number(req.token!.sub))

        res.status(201).send({ status: "success", data: newPhoto })

    } catch (err) {
        return res.status(500).send({ message: "Something went wrong with our server." })
    }
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
