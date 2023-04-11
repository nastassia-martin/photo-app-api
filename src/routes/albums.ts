/**
 * Albums router
 */
import express from 'express'
import { index, show, store, update, destroy, storePhotostoAlbum } from '../controllers/album_controller'
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
 * POST /albums
 */
router.post('/', albumRules, store)

/**
 * POST /albums/:albumId/photos
 */
router.post('/:albumId/photos', albumRules, storePhotostoAlbum)

/**
 * PATCH /albums/:albumId
 */
router.patch('/:albumId', albumRules, update)


/**
 * DELETE /albums/:albumId
 */
router.delete('/:albumId', destroy)

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete('/:albumId/photos/:photoId', disconnectPhoto)
export default router
