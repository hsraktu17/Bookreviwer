"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Book = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    },
    location: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    description: {
        type: String,
        trim: true
    }
});
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const reviewSchema = new mongoose_1.default.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    }
});
// Model Definitions
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Book = mongoose_1.default.model('Book', bookSchema);
exports.Book = Book;
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.Review = Review;
