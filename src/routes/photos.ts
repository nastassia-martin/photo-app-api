/**
 * Photos router
 */
import express from 'express'
import { index, show, store, update, destroy } from '../controllers/photo_controller'
import { createPhotoRules, updatePhotoRules } from '../validations/photo_rules'
const router = express.Router()

/**
 * GET / photos
 */
router.get('/', index)

/**
 * GET /photos/:photoId
 */
router.get('/:photoId', show)

/**
 * POST /photos
 */
router.post('/', createPhotoRules, store)

/**
 * PATCH /photos/:photoId
 */
router.patch('/:photoId', updatePhotoRules, update)

/**
 * DELETE /photos/:photoId
 */
router.delete('/:photoId', destroy)

export default router
