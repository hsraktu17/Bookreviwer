import express, { Request, Response } from 'express'
import z from 'zod'
import { User } from '../db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import authMiddleware from '../middleware'


const router = express.Router()

const signupSchema = z.object({
    email : z.string().email(),
    username : z.string().min(3),
    firstname : z.string().min(3),
    lastname : z.string().min(3),
    password : z.string().min(6)
})


router.post('/signup',async(req : Request, res : Response)=>{
    
    const validate = signupSchema.safeParse(req.body)

    if(!validate.success){
        return res.status(411).json({
            message : 'entry worng'
        })
    }

    const existingUser = await User.findOne({
        email : req.body.email
    })

    if(existingUser){
        return res.status(411).json({
            message : "user already exist"
        })
    }

    const user = await User.create({
        email : req.body.email,
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(201).json({
        message : "user created",
        token,
        id : user._id
    })

})


const signin = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

router.post('/signin',async (req : Request, res : Response) =>{

    const validate = signin.safeParse(req.body)

    if(!validate.success){
        return res.json({
            message : "wrong entry"
        })
    }

    const findUser = await User.findOne({
        email : req.body.email,
        password : req.body.password
    })

    if(findUser){
        const token = jwt.sign({
            userId : findUser._id
        },JWT_SECRET)
        return res.json({
            message : "signin done",
            token,
            id : findUser._id
        })
    }

    return res.json({
        message : "error signin"
    })
})


router.get('/userinfo',authMiddleware,async( req : Request, res : Response)=>{
    try{
        const user = await User.findById(req.userId)
        

        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        }

        return res.json({
            id : user._id,
            name : `${user.firstname} ${user.lastname}`,
            email : user.email
        })
    }catch(e){
        console.error("error : ",e)
        return res.status(500).json({
            message : "error happened"
        })
    }
})
export default router
