import mongoose from 'mongoose'

const connect = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log(`MongoDB Connected`))
}

export default connect
