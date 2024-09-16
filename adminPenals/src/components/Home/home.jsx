import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    tag: '',
    title: '',
    location: '',
    description: '',
    total_price: '',
    get_price: '',
    security_type: '',
    investment_multiple: '',
    maturity: '',
    min_investment: '',
  });

  const [Image, setImage] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append('Image', Image);
      const res = await axios.post('https://printovert-backend.onrender.com/api/v1/users/cloudinary/v2/upload/outService', formdata);
      const imageUrl = await res.data.URL;

      const payload = {
        ...user,
        card_image: imageUrl,
      };

      const response = await fetch('https://fliper-invest-backend.onrender.com/api/v1/project/card/create-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        setMessage(responseData.message);
        resetForm();
      } else {
        setMessage(responseData.message || 'Card not created');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      setMessage('An error occurred while creating the card');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUser({
      tag: '',
      title: '',
      location: '',
      description: '',
      total_price: '',
      get_price: '',
      security_type: '',
      investment_multiple: '',
      maturity: '',
      min_investment: '',
    });
    setImage(null);
    document.getElementById('card-image').value = '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-10">
      <div className="bg-gray-800 shadow-xl rounded-lg p-10 max-w-xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center font-inter">Create Investment Card</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(user).map((key) => (
            <div key={key} className="mb-6">
              <label htmlFor={key} className="block text-lg font-medium text-gray-300 mb-2 capitalize font-inter">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type={key.includes('price') || key.includes('investment') || key.includes('multiple') ? 'number' : 'text'}
                placeholder={key.replace(/_/g, ' ')}
                name={key}
                className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out font-inter"
                onChange={handleInput}
                value={user[key]}
                required
                style={{ height: '45px' }} // Adjust height
              />
            </div>
          ))}

          <div className="mb-6">
            <label htmlFor="card_image" className="block text-lg font-medium text-gray-300 mb-2 font-inter">
              Card Image
            </label>
            <input
              id="card-image"
              type="file"
              name="card_image"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out font-inter"
              onChange={handleImageUpload}
              required
              style={{ height: '45px' }} // Adjust height
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 text-xl font-semibold rounded-lg transition-all duration-300 ease-in-out font-inter ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {message && (
          <p
            className="text-center text-green-500 text-xl font-medium mt-6 animate-pulse font-inter"
            style={{ animation: 'glow 1.5s ease-in-out infinite alternate' }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
