import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  rating: number;
  content: string;
}

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(1);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddReview = async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
            throw new Error('No token found');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        const response = await axios.post(`http://localhost:5000/api/v1/bookR/books/${id}/reviews`, {
        content: newReviewContent,
        rating: newReviewRating,
      }, { headers });
      setReviews([...reviews, response.data.review]);
      setNewReviewContent('');
      setNewReviewRating(1);
    } catch (error) {
      console.error('Error adding review:', error);
      setError('An error occurred while adding the review');
    }
  };

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
        <button 
          onClick={handleGoBack} 
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back
        </button>
        {book && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-700 mb-2"><span className="font-bold">Author:</span> {book.author}</p>
            <p className="text-gray-700 mb-2"><span className="font-bold">Genre:</span> {book.genre}</p>
            <p className="text-gray-700 mb-2"><span className="font-bold">Description:</span> {book.description}</p>
          </div>
        )}
        <h3 className="text-xl font-bold mt-6 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="divide-y divide-gray-300">
            {reviews.map((review) => (
              <div key={review._id} className="py-4">
                <p className="text-gray-700 mb-2"><span className="font-bold">Rating:</span> {review.rating}/5</p>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Add a Review</h3>
          <textarea
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            value={newReviewContent}
            onChange={(e) => setNewReviewContent(e.target.value)}
          />
          <div className="mb-4">
            <label className="block text-gray-700">Rating:</label>
            <select
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleAddReview} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
