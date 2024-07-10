import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

interface UserInfo {
  id: string;
  username: string;
  name: string;
  email: string;
  location?: string;
  age?: number;
  work?: string;
  dob?: string;
  description?: string;
}

const UpdateProfile = () => {
  const [formData, setFormData] = useState<UserInfo | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState<string | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.removeItem('token');
        navigate('/signin');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/v1/user/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpdateData(response.data)
      console.log(response.data)
      setMessage('Profile updated successfully!');
      setError(null);
    } catch (error) {
      setError('Error updating profile.');
      setMessage(null);
    }
  };

  if (!formData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="work">Work</label>
            <input
              id="work"
              name="work"
              type="text"
              value={formData.work || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
