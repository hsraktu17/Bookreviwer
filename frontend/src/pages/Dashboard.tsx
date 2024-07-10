import axios from 'axios';
import { useEffect, useState } from 'react';
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

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.removeItem('token');
        navigate('/signin');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  if (!userInfo) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">User Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <p className="mb-4"><strong className="font-semibold">Name:</strong> {userInfo.name}</p>
              <p className="mb-4"><strong className="font-semibold">Email:</strong> {userInfo.email}</p>
              <p className="mb-4"><strong className="font-semibold">Username:</strong> {userInfo.username}</p>
            </div>
            <div className="col-span-1">
              <p className="mb-4"><strong className="font-semibold">Location:</strong> {userInfo.location || 'N/A'}</p>
              <p className="mb-4"><strong className="font-semibold">Age:</strong> {userInfo.age || 'N/A'}</p>
              <p className="mb-4"><strong className="font-semibold">Work:</strong> {userInfo.work || 'N/A'}</p>
              <p className="mb-4"><strong className="font-semibold">Date of Birth:</strong> {userInfo.dob || 'N/A'}</p>
              <p className="mb-4"><strong className="font-semibold">Description:</strong> {userInfo.description || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/update-profile')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
