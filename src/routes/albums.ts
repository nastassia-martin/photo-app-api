/**
 * Albums router
 */
import express from 'express'
import { index, show, store, update, destroy } from '../controllers/album_controller'
import { albumRules } from '../validations/album_rules'
const router = express.Router()

/**
 * GET / albums
 */
router.get('/', index)

/**
 * GET /albums/:albumId
 */
router.get('/:albumId', show)

/**
 * POST /photos
 */
router.post('/', albumRules, store)

/**
 * PATCH /photos/:photoId
 */
router.patch('/:albumId', albumRules, update)

/**
 * DELETE /photos/:photoId
 */
router.delete('/:albumId', destroy)

export default router
