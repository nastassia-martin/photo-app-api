import express from "express"
import { createUserRules } from '../validations/user_rules'
import { register, login, refresh } from "../controllers/user_controller"
import { validationToken } from "../middlewares/auth/jwt"
import profile from './profile'
import photos from './photos'
import albums from './albums'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "<Welcome to your photo app, beep boop>",
	})
})

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

/**
 * /albums
 */
router.use('/albums', validationToken, albums)
/**
 * /photos
 */
router.use('/photos', validationToken, photos)

/**
 * /profile
 */
router.use('/profile', validationToken, profile)
/**
 * POST /
 */

/**
 * /register
 */
router.post('/register', createUserRules, register)

/**
 * /login
 */
router.post('/login', login)

/**
 * /refresh
 */
router.post('/refresh', refresh)

export default router
