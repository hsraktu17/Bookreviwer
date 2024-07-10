import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

interface Review {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  comment: string;
  rating: number;
}

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/bookR/books/${id}`);
        setBook(response.data.book);
        setReviews(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('An error occurred while fetching the book details');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-700 mb-4">{book.description}</p>
          <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="divide-y divide-gray-300">
              {reviews.map((review) => (
                <div key={review._id} className="py-4">
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">User:</span> {review.userId.username}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">Rating:</span> {review.rating}/5
                  </p>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
