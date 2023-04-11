/**
 * Album Service
 * Here we host Prisma logic (ie queries)
 */
import { connect } from 'http2'
import prisma from '../prisma'
import { CreateNewAlbum, UpdateAlbumData, } from '../types'

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
 * Update an album
 * 
 */
export const updateAlbum = async (userId: number, data: UpdateAlbumData,) => {

    return await prisma.album.update({
        where: {
            id: userId,
        },
        data: data,
    })

}

/**
 * Add photo to an album
 * will need 3 params, userId, albumId & photoId
 * need to check userid is connected to albumid - if not reject
 * need to check photoId exists - if not reject
 * connect photoId to albumId
 */
export const addPhoto = async (albumId: number, photoId: number) => {
    return await prisma.album.update({
        where: {
            id: albumId
        },
        data: {
            photos: {
                connect: { id: photoId } // one photo
            },
        },
    })
}

export const addPhotos = async (albumId: number, photoIds: []) => {


    return await prisma.album.update({
        where: {
            id: albumId
        },
        data: {
            photos: {
                connect: photoIds

            }
        }
    })
}

/**
 * Delete a album
 * 
 */
export const deleteAlbum = async (albumId: number) => {

    return await prisma.album.delete({
        where: {
            id: albumId,
        }, select: {
            userId: true
        }
    })
}