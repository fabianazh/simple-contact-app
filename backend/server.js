import express from 'express'
import cors from 'cors'
import ContactRoute from './router/ContactRoute.js'
import connect from './utils/connect.js'
// import dotenv from 'dotenv'

connect('mongodb://127.0.0.1:27017/Contact')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(ContactRoute)

app.listen(port, () => {
    console.log(`Contact App listen in http://localhost:3000`)
})
