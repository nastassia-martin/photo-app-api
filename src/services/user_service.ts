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
    return prisma.user.create({
        data: data,
    })
}