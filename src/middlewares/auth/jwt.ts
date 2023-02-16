/**
 * JWT Authentication Middleware
 */

import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../../types'

const debug = Debug('photo-api:jwt')

/**
 * Validate JWT Access Token - used everytime user accesses any part of their profile AFTER they have logged in
 * We use a bearer token (not HTTP basic)
 * Authorzation: bearer <token>
 */

export const validationToken = (req: Request, res: Response, next: NextFunction) => {
    debug("JWT middleware: ")
    // Make sure Authorization header exists, else fail
    if (!req.headers.authorization) {
        debug("missing authorization header")

        res.status(401).send({
            status: "fail",
            data: "Authorization required"
        })
    }

    // Split Authorization header on ` `
    const [authSchema, token] = req.headers.authorization!.split(" ")

    // Check that Authorization scheme is "Bearer", else fail
    if (authSchema.toLowerCase() !== "bearer") {
        debug("authorization schema isn't bearer")

        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        })
    }

    // Verify token and attach payload to request, else fail
    try {
        const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JWTPayload
        // console.log("payload: ", payload)

        // attach user to payload
        req.token = payload

    }
    catch (err) {
        debug("token not verified")

        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        })
    }
    next()
}

