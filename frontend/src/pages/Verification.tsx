import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const VerifyForm: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [age, setAge] = useState<number | undefined>();
  const [work, setWork] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await axios.post('http://localhost:5000/api/v1/user/verify', {
        location,
        age,
        work,
        description
      },{ headers });

      console.log(response.data); // Handle response as needed
      history('/dashboard')

    } catch (error) {
      console.error('Error:', error);
      // Handle error state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age || ''} onChange={(e) => setAge(parseInt(e.target.value))} />
      </label>
      <label>
        Work:
        <input type="text" value={work} onChange={(e) => setWork(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default VerifyForm;
