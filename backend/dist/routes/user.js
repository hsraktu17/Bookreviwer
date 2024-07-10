"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = __importDefault(require("../middleware"));
const router = express_1.default.Router();
const signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    username: zod_1.default.string().min(3),
    firstname: zod_1.default.string().min(3),
    lastname: zod_1.default.string().min(3),
    password: zod_1.default.string().min(6)
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = signupSchema.safeParse(req.body);
    if (!validate.success) {
        return res.status(411).json({
            message: 'entry worng'
        });
    }
    const existingUser = yield db_1.User.findOne({
        email: req.body.email
    });
    if (existingUser) {
        return res.status(411).json({
            message: "user already exist"
        });
    }
    const user = yield db_1.User.create({
        email: req.body.email,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });
    const userId = user._id;
    const token = jsonwebtoken_1.default.sign({
        userId
    }, config_1.JWT_SECRET);
    res.status(201).json({
        message: "user created",
        token,
        id: user._id
    });
}));
const signin = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = signin.safeParse(req.body);
    if (!validate.success) {
        return res.json({
            message: "wrong entry"
        });
    }
    const findUser = yield db_1.User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (findUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: findUser._id
        }, config_1.JWT_SECRET);
        return res.json({
            message: "signin done",
            token,
            id: findUser._id
        });
    }
    return res.json({
        message: "error signin"
    });
}));
router.get('/userinfo', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.json({
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email
        });
    }
    catch (e) {
        console.error("error : ", e);
        return res.status(500).json({
            message: "error happened"
        });
    }
}));
exports.default = router;
