// components/AddBookForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    try {

      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      if (!token) {
        navigate('/signin')
        
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.post('http://localhost:5000/api/v1/bookR/books/', { title, author, genre, description },{ headers });
      console.log('Book added successfully:', response.data);
      navigate('/bookpage')
      // Optionally: Show success message or redirect to a success page
    } catch (error) {
      console.error('Error adding book:', error);
      setErrorMessage('An error occurred while adding the book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title:
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                  Author:
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="author"
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
                  Genre:
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="genre"
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description:
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
