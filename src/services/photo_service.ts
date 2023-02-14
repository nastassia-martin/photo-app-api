/**
 * Photo Service
 * Here we host Prisma logic (ie queries)
 */
import prisma from '../prisma'

/**
 * Get all photos
 */

export const getPhotos = async () => {

    return await prisma.photo.findMany({


    })
}