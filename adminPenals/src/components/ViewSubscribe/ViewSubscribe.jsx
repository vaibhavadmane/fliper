import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewSubscribe() {

  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
      const fetchSubscribers = async () => {
          const response = await axios.get('http://localhost:5000/api/v1/project/subscribe/get-subscribe');
          setSubscribers(response.data);
      };
      fetchSubscribers();
  }, []);


  return (
    <div className='bg-gray-700 h-[100vh]'>
            <h4 className='text-4xl mb-3 text-center font-bold'>here is all subscribe</h4>
            <ul>
                {subscribers.map((subscriber) => (
                    <li className='text-xl ml-2 font-semibold mb-3' key={subscriber._id}>{subscriber.email}</li>
                ))}
            </ul>
        </div>
  )
}

export default ViewSubscribe