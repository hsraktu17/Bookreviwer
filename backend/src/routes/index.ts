import express, { Request, Response } from 'express'
import userRouter from './user'
import bookRouter from './book'

const router = express.Router()

router.use('/user',userRouter)
router.use('/bookR',bookRouter)

export default router