/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { createAlbum, getAlbums } from '../services/album_service'

// Create a new debug instance
const debug = Debug('photo-api:album_controller 📝')

/**
 * Get all albums, no photos
 */
export const index = async (req: Request, res: Response) => {
    try {
        const albums = await getAlbums(req.token!.sub)
        res.send({
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
    try {
        const album = await prisma.album.findUniqueOrThrow()
        res.send({
            status: "success",
            data: null,
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" })
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
        res.send({
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
    // validate data
    try {
        // const newalbums = await prisma.album.create({
        //     // data: {

        //     }
        // })
        res.send({
            status: "success",
            data: null,
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" })
    }
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {
    // validate data

}

/**
 * Delete an album & links to photos but not the photos themselves, VG 
 */
export const destroy = async (req: Request, res: Response) => {
}
