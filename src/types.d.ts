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