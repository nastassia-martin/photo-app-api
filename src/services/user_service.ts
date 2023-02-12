/**
 * User Service
 * Here we host Prisma logic (ie queries)
 */

import prisma from '../prisma'
import { CreateNewUser } from '../types'



/**
 * Prisma logic for creating user
 */

export const newUser = async (data: CreateNewUser) => {
    return await prisma.user.create({
        data: data,
    })
}

/**
 * Prisma logic to get user by email
 * this will be used to log in a user
 */

export const getUserbyEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}