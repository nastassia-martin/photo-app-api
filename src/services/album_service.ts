/**
 * Album Service
 * Here we host Prisma logic (ie queries)
 */
import prisma from '../prisma'
import { CreateNewAlbum, CreateNewPhoto, UpdatePhotoData } from '../types'

/**
 * Get all albums
 * Returns a list of the user’s albums (excl. photos).
 * the param here is the user id which will be the req.token.sub which you will enter as a param in the photo like this: 
 * const photos = await getPhotos(req.token!.sub)
 * here you findMany() albums, where the userId will match the reqToken in 
 */

export const getAlbums = async (userId: number) => {
    return await prisma.album.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            title: true,
        }
    })
}

/**
 * Get 1 album
 * Get a single album, incl. the album's photos.
 * 
 */
export const getalbum = async (albumId: number) => {
    return await prisma.album.findUniqueOrThrow({
        where: {
            id: albumId
        },
        select: {
            userId: true,
            id: true,
            title: true,
            photos: true
        },
    })
}



/**
 * Create an album
 * 
 */
export const createAlbum = async (data: CreateNewAlbum, user_Id: number) => {

    return await prisma.album.create({
        data: {
            title: data.title,
            userId: user_Id
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