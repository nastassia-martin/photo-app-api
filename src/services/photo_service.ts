/**
 * Photo Service
 * Here we host Prisma logic (ie queries)
 */
import { connect } from 'http2'
import prisma from '../prisma'
import { CreateNewPhoto } from '../types'

/**
 * Get all photos
 * the param here is the user id which will be the req.token.sub which you will enter as a param in the photo like this: 
 * const photos = await getPhotos(req.token!.sub)
 * here you findMany() photos, where the userId will match the reqToken in 
 */

export const getPhotos = async (userId: number) => {
    return await prisma.photo.findMany({
        where: {
            userId: userId
        }
    })
}



/**
 * Create a photo
 */
export const createPhoto = async (data: CreateNewPhoto, userId: number) => {

    return await prisma.photo.create({
        data: {
            title: data.title,
            url: data.url,
            comment: data.comment,
            userId: userId
        },
    })

}