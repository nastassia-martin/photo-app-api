/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Get all albums, no photos
 */
export const index = async (req: Request, res: Response) => {
    try {
        const albums = await prisma.album.findMany()
        res.send({
            status: "success",
            data: null,
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
    // validate data
    try {
        // prisma create album
        res.send({
            status: "success",
            data: null,
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" })
    }
}

/**
 * add photo to album
 */
export const storePhoto = async (req: Request, res: Response) => {
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
