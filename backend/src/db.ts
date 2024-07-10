import mongoose, { Document, Schema } from 'mongoose';

mongoose.connect("mongodb+srv://utkarsh172002srivastava:u7cPS1M9QAjGZ2JD@cluster0.sxjqohy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Book")

// User Schema
interface UserDocument extends Document {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    location?: string;
    age?: number;
    work?: string;
    dob?: Date;
    description?: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
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

// Book Schema
interface BookDocument extends Document {
    title: string;
    author: string;
    genre: string;
    description: string;
    userId: mongoose.Types.ObjectId;
}

const bookSchema = new mongoose.Schema<BookDocument>({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Review Schema
interface ReviewDocument extends Document {
    bookId: mongoose.Types.ObjectId;
    
    rating: number;
    content: string;
}

const reviewSchema = new mongoose.Schema<ReviewDocument>({
    bookId: {
        type: Schema.Types.ObjectId,
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
const User = mongoose.model<UserDocument>('User', userSchema);
const Book = mongoose.model<BookDocument>('Book', bookSchema);
const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);

export { User, UserDocument, Book, BookDocument, Review, ReviewDocument };
