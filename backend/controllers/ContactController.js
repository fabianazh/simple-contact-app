import Contact from '../models/Contact.js'
import { body, validationResult, check } from 'express-validator'

// Index
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json({ contacts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Search
export const searchContact = async (req, res) => {
    try {
        const searchQuery = req.params.name
        const contacts = await Contact.find({
            name: { $regex: searchQuery, $options: 'i' },
        })
        res.json({ contacts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Store
export const storeContact = async (req, res) => {
    try {
        const contact = await new Contact(req.body)
        await contact.save()
        res.json({ message: 'Contact saved' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Show
export const showContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)

        // if (!contact) {
        //     return res.status(404).json({ message: 'Kontak tidak ditemukan' })
        // } else {
        //     res.json({ contact, message: 'p' })
        // }
        res.json({ contact, message: 'p' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Update
export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)

        if (!contact) {
            return res.status(404).json({ message: 'Kontak tidak ditemukan' })
        }

        const updatedContact = await Contact.updateOne(contact, {
            $set: req.body,
        })

        if (updatedContact.modifiedCount > 0) {
            res.json({ message: 'Kontak berhasil diperbarui' })
        } else {
            res.json({ message: 'Tidak ada perubahan yang dilakukan' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Destroy
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        await Contact.deleteOne(contact)
        res.json({ message: 'Contact deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
