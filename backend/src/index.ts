import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

import router from './routes'
app.use('/api/v1/', router)

const PORT = process.env.PORT || 5000


app.listen(PORT,()=>console.log("server started"))