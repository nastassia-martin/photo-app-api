/**
 * Type Definitions
 */

export type CreateNewUser = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}
export type JWTPayload = {
    sub: number,
    first_name: string,
    last_name: string,
    email: string,
    iat?: number,
    exp?: number
}
/**
 * Photos
 */

export type ReadPhotoData = {
    title: string,
    url: string,
    comment: string,
    userId: number
}
export type CreateNewPhoto = {
    title: string,
    url: string,
    comment: string,
    userId: number
}

