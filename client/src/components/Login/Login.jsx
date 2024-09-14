import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: ""
    });
  
    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      setUser({ ...user, [name]: value });
    }
  
      const handleSubmit=async(e)=>{
      e.preventDefault();
       const apiUrl = 'http://localhost:5000/api/v1/project/users/login';
  
       try {
         const response = await fetch(apiUrl, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(user),
         });
     console.log("if staerted");
         if (response.status==200) {
          setMessage(response.message || 'user Login successfully  ');
          navigate('/')
          console.log("successfulr login");
           throw new Error('Login successfuly');
         }
         else{
          console.log("not register yet");
          setMessage(response.message || 'User not registered');
         }
      } catch (error) {
        console.error('Error during login:', error);
      }
  }

  return (
//     <div className='text-center  h-[100vh] w-[100%]'>
//        <h1 className='text-4xl mb-5  text-gray-50'>Login your Account</h1>
// <div className='   mx-auto bg-gray-300 h-[50vh] w-[50%] flex flex-col align-center justify-center rounded-2xl'>
//       <form onSubmit={handleSubmit} >
     
//         <div className='mb-6 text-3xl p-5 text-gray-600 ml-8 '>
//           <label htmlFor="email">
//             <strong>Email:</strong>
//           </label>
//           <input
//             type="email"
//             placeholder='Enter Email'
//             autoComplete='off'
//             name="email"
//             className='form-control form-control rounded-3XL rounded-xl text-xl p-1 text-center  text-gray-500 ml-12'
//             onChange={handleInput}
//           />
//         </div>

//         <div className='mb-6 text-3xl  text-gray-600'>
//           <label htmlFor="password">
//             <strong>Password:</strong>
//           </label>
//           <input
//             type="password"
//             placeholder='Enter Password'
//             autoComplete='off'
//             name="password"
//             className='form-control rounded-3XL text-xl rounded-xl p-1 text-center ml-6  text-gray-500'
//             onChange={handleInput}
//           />
//         </div>
//       <button type='submit' onSubmit={handleSubmit} className='btn mb-6 text-2xl text-gray-100 hover:text-white btn-success  rounded-xl hover:bg-gray-500 bg-gray-600 p-3 pt-2 pb-2'>Login</button>
       
//       </form>
//       {<p className='text-xl text-red-500 '> {message}</p>}   
//       </div>
//       </div>

<div className="flex justify-center items-center h-screen bg-gray-900">
  <div className="text-center w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
    <h1 className="text-4xl font-bold mb-8 text-gray-50">Login to Your Account</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-6 text-left">
        <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleInput}
        />
      </div>
      <div className="mb-6 text-left">
        <label htmlFor="password" className="block text-lg font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          name="password"
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleInput}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
      >
        Login
      </button>
    </form>
    {message && <p className="text-xl text-red-500 mt-4">{message}</p>}
  </div>
</div>



  )
}
export default Login