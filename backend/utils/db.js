import mongoose from 'mongoose'
import Contact from '../models/Contact.js'
import connect from './connect.js'

connect()

// Membuat 1 data
const contact = new Contact({
    name: 'fabian',
    no: '0895404288345',
    email: 'f@gmail.com',
})

// Simpan ke collection
contact.save().then((result) => console.log(result))
