import express from "express"
import { createUserRules } from '../validations/user_rules'
import { register, login } from "../controllers/user_controller"
//import albums 
//import photos
//import profile from users
// import controllers / varioous
// import validate token OR http basic
// import validations / various

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

/**
 * /photos
 */

/**
 * /profile
 */

/**
 * POST /
 */

/**
 * /register
 * @todo add validation rules for email, password, first_name & last_name
 * @todo move rules to it's own file
 */
router.post('/register', createUserRules, register)

/**
 * /login
 */
router.post('/login', login)

/**
 * /refresh
 */

export default router
