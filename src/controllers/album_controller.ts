/**
 * Album Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { addPhoto, createAlbum, deleteAlbum, getalbum, getAlbums, updateAlbum } from '../services/album_service'
import { getPhoto, getPhotos } from '../services/photo_service'
import { userInfo } from 'os'

// Create a new debug instance
const debug = Debug('photo-api:album_controller 📝')

/**
 * Get all albums, no photos
 */
export const index = async (req: Request, res: Response) => {
    const userId = Number(req.token!.sub)
    if (!userId) {
        return res.status(401).send({
            status: "fail",
            message: "you are not authorized to view this album"
        })
    }
    try {
        const albums = await getAlbums(userId)
        console.log(albums)
        return res.status(200).send({
            status: "success",
            data: albums,
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" })
    }
}

/**
 * Get a single albums and albums photos
 */
export const show = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    const userId = Number(req.token!.sub)

    try {
        const album = await getalbum(albumId)
        if (album.userId !== userId) {
            return res.status(403).send({
                status: "fail",
                message: "Not authorized to access this album"
            })
        }
        return res.status(200).send({
            status: "success",
            data: {
                id: album.id,
                title: album.title,
                photos: album.photos
            }
        })


    } catch (err) {
        res.status(404).send({ status: "fail", message: "No album found" })
    }
}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {
    // validate album
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }
    const albumInput = req.body
    try {
        const album = await createAlbum(albumInput, Number(req.token!.sub))
        res.status(201).send({
            status: "success",
            data: album,
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" })
    }
}

/**
 * add photo to album
 */
export const storePhototoAlbum = async (req: Request, res: Response) => {

    // const albumId = Number(req.params.albumId)
    // const photoId = Number(req.body.photoId)
    // const userId = Number(req.token!.sub)


    // try {
    //     const connectedAlbum = await getalbum(albumId)
    //     if (connectedAlbum.userId !== userId) {
    //         return res.status(403).send({
    //             status: "fail",
    //             message: "Not authorized to access this album"
    //         })

    //     }
    //     const connectedPhoto = await getPhoto(photoId)
    //     if (connectedPhoto.userId !== userId) {
    //         return res.status(403).send({
    //             status: "fail",
    //             message: "Not authorized to access this photo"
    //         })
    //     }

    //     const photo = await addPhoto(connectedAlbum.id, connectedPhoto.id)

    //     res.status(200).send({
    //         status: "success",
    //         data: null,
    //     })
    // } catch (err) {
    //     res.status(404).send({ status: "error", message: "Photo doesn't exist" })
    // }
}
/**
 * add photos to album
 */
export const storeManyPhotos = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    const userId = Number(req.token!.sub)
    // get all the photos in the body
    const photoIds: number[] = req.body.photosIds
    const test: [] = req.body.photosIds.map((photoId: Number) => {
        return {
            id: photoId
        }
    })


    try {
        const connectedAlbum = await getalbum(albumId)
        // user must be authorised to access album
        if (connectedAlbum.userId !== userId) {
            return res.status(403).send({
                status: "fail",
                message: "Not authorized to access this album"
            })
        }
        // photos must belong to user
        const photos = await prisma.photo.findMany({
            where: {
                id: { in: photoIds },
                userId: userId
            },
            select: { id: true }
        })
        //const connectedUser = photos.map(photo => photo.id)
        const found: boolean = photoIds.every((id: number) => {
            return photos.find(photo => photo.id === id)
        })
        debug("photoIds", photoIds)
        debug("photos", photos)
        debug("found", found)
        debug("test", test)
        if (!found) {
            return res.status(403).send({
                status: "fail",
                message: "Not authorized to access all of these photos"
            })
        }

        const result = await prisma.album.update({
            where: { id: albumId },
            data: {
                photos: {
                    connect: test,
                }
            },
        })
        res.send(result)
    } catch (err) {
        res.status(500).send({ message: "something went wrong" })

        debug("err", err)
    }
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {
    // validate data
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
        const albumData = await updateAlbum(req.token!.sub, validatedData)

        return res.status(200).send({ status: "success", data: albumData })

    } catch {
        return res.status(500).send({ status: "error", message: "Something went wrong in our server" })
    }

}

/**
 * Delete an album & links to photos but not the photos themselves, VG 
 */
export const destroy = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId)
    const userId = Number(req.token!.sub)

    try {
        const connectedAlbum = await getalbum(albumId)

        if (connectedAlbum.userId !== userId) {
            return res.status(403).send({
                status: "fail",
                message: "Not authorized to access this album"
            })
        }
        const result = await deleteAlbum(albumId)
        return res.status(200).send({ status: "success", data: null })

    } catch {
        return res.status(404).send({ status: "fail", message: "album not found" })
    }
}

