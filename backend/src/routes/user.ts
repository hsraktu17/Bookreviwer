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
            name : `${user.firstname} ${user.lastname}`,
            email : user.email,
            username : user.username,
            location : user.location,
            age : user.age,
            work : user.work,
            dob : user.dob,
            description : user.description
        })
    }catch(e){
        console.error("error : ",e)
        return res.status(500).json({
            message : "error happened"
        })
    }
})

const verifySchema = z.object({
    location: z.string().optional(),
    age: z.number().optional(),
    work: z.string().optional(),
    description: z.string().optional()
})

router.post('/verify',authMiddleware,async(req : Request, res : Response) =>{
    const validate = verifySchema.safeParse(req.body);

    if (!validate.success) {
        return res.status(400).json({
            message: "invalid data"
        });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        user.location = req.body.location || user.location;
        user.age = req.body.age || user.age;
        user.work = req.body.work || user.work;
        user.description = req.body.description || user.description;

        await user.save();

        return res.json({
            message: "user info updated",
            user: {
                id: user._id,
                username: user.username,
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                location: user.location,
                age: user.age,
                work: user.work,
                dob: user.dob,
                description: user.description
            }
        });
    } catch (e) {
        console.error("error: ", e);
        return res.status(500).json({
            message: "an error occurred"
        });
    }
})

const updateSchema = z.object({
    firstname: z.string().min(3).optional(),
    lastname: z.string().min(3).optional(),
    location: z.string().optional(),
    age: z.number().optional(),
    work: z.string().optional(),
    dob: z.string().optional(),
    description: z.string().optional()
});


router.put('/update', authMiddleware, async (req: Request, res: Response) => {
    const validate = updateSchema.safeParse(req.body);

    if (!validate.success) {
        return res.status(400).json({
            message: "Invalid data"
        });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        if (req.body.location) user.location = req.body.location;
        if (req.body.age) user.age = req.body.age;
        if (req.body.work) user.work = req.body.work;
        if (req.body.dob) user.dob = req.body.dob;
        if (req.body.description) user.description = req.body.description;

        await user.save();

        return res.json({
            message: "User info updated",
            user: {
                id: user._id,
                username: user.username,
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                location: user.location,
                age: user.age,
                work: user.work,
                dob: user.dob,
                description: user.description
            }
        });
    } catch (e) {
        console.error("Error: ", e);
        return res.status(500).json({
            message: "An error occurred"
        });
    }
});

export default router
