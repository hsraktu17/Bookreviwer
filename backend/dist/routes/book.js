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
const db_1 = require("../db");
const middleware_1 = __importDefault(require("../middleware"));
const router = express_1.default.Router();
// Create a new book
router.post('/books', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, description } = req.body;
    const userId = req.userId;
    try {
        // Validate userId presence
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        // Validate author length
        if (author.length > 50) {
            return res.status(400).json({ message: 'Author name exceeds maximum length of 50 characters' });
        }
        const newBook = new db_1.Book({ title, author, genre, description, userId });
        yield newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    }
    catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'An error occurred while adding the book' });
    }
}));
// Fetch list of books
router.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield db_1.Book.find();
        res.status(200).json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'An error occurred while fetching the books' });
    }
}));
// Fetch book details and reviews
router.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield db_1.Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const reviews = yield db_1.Review.find({ bookId: book._id }).populate({ path: 'user',
            select: 'username',
            options: { strictPopulate: false } });
        res.status(200).json({ book, reviews });
    }
    catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ message: 'An error occurred while fetching the book details' });
    }
}));
router.post('/books/:id/reviews', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content, rating } = req.body;
    try {
        const book = yield db_1.Book.findById(id);
        console.log(book);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const newReview = new db_1.Review({
            bookId: id,
            rating,
            content
        });
        // Optionally set userId if your schema allows default values or handles it internally
        // newReview.userId = req.userId;
        yield newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'An error occurred while adding the review' });
    }
}));
// Fetch reviews for a specific book
router.get('/books/:id/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reviews = yield db_1.Review.find({ bookId: id }).populate({
            path: 'user',
            select: 'username',
            options: { strictPopulate: false } // Set strictPopulate to false
        });
        console.log(reviews);
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'An error occurred while fetching the reviews' });
    }
}));
exports.default = router;
