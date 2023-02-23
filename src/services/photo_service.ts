/**
 * Photo Service
 * Here we host Prisma logic (ie queries)
 */
import { connect } from 'http2'
import prisma from '../prisma'
import { CreateNewPhoto, UpdatePhotoData } from '../types'

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
        },
        select: {
            id: true,
            title: true,
            url: true,
            comment: true
        }
    })
}

/**
 * Get 1 photo
 * 
 */
export const getPhoto = async (photoId: number) => {
    return await prisma.photo.findUniqueOrThrow({
        where: {
            id: photoId
        },
        select: {
            userId: true,
            id: true,
            title: true,
            url: true,
            comment: true
        }
    })
}



/**
 * Create a photo
 * 
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

/**
 * Update a photo
 * 
 */
export const updatePhoto = async (userId: number, data: UpdatePhotoData,) => {

    return await prisma.photo.update({
        where: {
            id: userId,
        },
        data: data,
    })

}

/**
 * Delete a photo
 * 
 */
export const deletePhoto = async (photoId: number, userId: number) => {

    return await prisma.photo.delete({
        where: {
            id: photoId,
        },
    })
}