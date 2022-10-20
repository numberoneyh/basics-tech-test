import * as dotenv from 'dotenv'

dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use('/api', express.static('static'))
app.use(fileUpload({}))
app.use(cors())
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT)
    app.listen(PORT)
  } catch (e) {
    console.log(e.message)
  }
}

start().then(() => console.log('server started on port: ' + PORT))
