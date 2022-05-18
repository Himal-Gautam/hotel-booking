import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true, 
    // useCreateIndex: true, 
    useUnifiedTopology: true }
).then(() => console.log('database connection established'))
.catch(err => console.log(err))