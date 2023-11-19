import express from 'express'
import {
    getContacts,
    searchContact,
    storeContact,
    showContact,
    updateContact,
    deleteContact,
} from '../controllers/ContactController.js'

const router = express.Router()
router.get('/contact', getContacts)
router.get('/contact/search/:name', searchContact)
router.post('/contact', storeContact)
router.get('/contact/:id', showContact)
router.patch('/contact/:id', updateContact)
router.delete('/contact/:id/delete', deleteContact)

export default router
