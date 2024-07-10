import express, { Request, Response } from 'express';
import { Book, BookDocument, Review, ReviewDocument } from '../db';
import authMiddleware from '../middleware';

const router = express.Router();

// Create a new book
router.post('/books', authMiddleware, async (req: Request, res: Response) => {
    const { title, author, genre, description } = req.body;
    const userId = req.userId
    try {
        // Validate userId presence
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        // Validate author length
        if (author.length > 50) {
            return res.status(400).json({ message: 'Author name exceeds maximum length of 50 characters' });
        }

        const newBook = new Book({ title, author, genre, description, userId });
        await newBook.save();

        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'An error occurred while adding the book' });
    }
});

// Fetch list of books
router.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'An error occurred while fetching the books' });
    }
});

// Fetch book details and reviews
router.get('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const reviews = await Review.find({ bookId: book._id }).populate({path: 'user',
            select: 'username',
            options: { strictPopulate: false }});

        res.status(200).json({ book, reviews });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ message: 'An error occurred while fetching the book details' });
    }
});


router.post('/books/:id/reviews', authMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, rating } = req.body;

    try {
        const book = await Book.findById(id);
        console.log(book)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const newReview = new Review({
            bookId: id,
            rating,
            content
        });

        // Optionally set userId if your schema allows default values or handles it internally
        // newReview.userId = req.userId;

        await newReview.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'An error occurred while adding the review' });
    }
});

// Fetch reviews for a specific book
router.get('/books/:id/reviews', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const reviews = await Review.find({ bookId: id }).populate({
            path: 'user',
            select: 'username',
            options: { strictPopulate: false } // Set strictPopulate to false
        });
        console.log(reviews)
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'An error occurred while fetching the reviews' });
    }
});
export default router;
