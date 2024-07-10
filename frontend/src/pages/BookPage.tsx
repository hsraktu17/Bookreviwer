// components/BooksList.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/bookR/books/');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('An error occurred while fetching the books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Books List</h2>
        <div className="grid grid-cols-1 gap-4">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
              <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Author:</span> {book.author}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Genre:</span> {book.genre}
                </p>
                <p className="text-gray-700">{book.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
