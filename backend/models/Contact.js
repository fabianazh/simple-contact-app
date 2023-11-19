import mongoose from 'mongoose'

// Membuat schema
const Contact = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    no: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
})

export default mongoose.model('Contacts', Contact)
