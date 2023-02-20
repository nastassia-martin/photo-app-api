/**
 * Photo Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getPhotos, createPhoto, updatePhoto, getPhoto } from '../services/photo_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('photo-api:album_controller 📝')

/**
 * Get all photos from an authenticated user
 * 
 */
export const index = async (req: Request, res: Response) => {
    //check that the user is verified  with the req token
    //need to remove userId
    try {
        const photos = await getPhotos(req.token!.sub)
        if (!photos) {
            return res.status(404).send({
                status: "fail",
                message: "no photos found"
            })
        }
        console.log(photos)
        return res.status(200).send({
            status: "success",
            data: photos,
        })
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" })
    }
}


/**
 * Get a single photo from an authenticated user
 */
export const show = async (req: Request, res: Response) => {
    const photoId = Number(req.params.photoId)
    const userId = Number(req.token!.sub)


    try {
        const photo = await getPhoto(photoId)

        if (photo.userId !== userId) {
            return res.status(403).send({
                status: "fail",
                message: "Not authorized to access this photo"
            });
        }

        return res.status(200).send({
            status: "success", data: {
                id: photo.id,
                title: photo.title,
                url: photo.url,
                comment: photo.comment
            }
        })
    }
    catch (err) {
        res.status(404).send({ status: "error", message: "no photo found" })
    }
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

    // check for validation errors
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    // Get only the validated data from the request
    const validatedData = matchedData(req)

    try {
        const photoData = await updatePhoto(req.token!.sub, validatedData)

        return res.status(200).send({ status: "success", data: photoData })

    } catch {
        return res.status(500).send({ status: "error", message: "Could not update photo in database" })
    }



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
