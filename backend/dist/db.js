"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://utkarsh172002srivastava:u7cPS1M9QAjGZ2JD@cluster0.sxjqohy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Book");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
