import { useEffect,useState } from "react";
import axios from "axios";
import './home.css'
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import svg1 from './assets/assest/Next Invest - Landing Page (images)/1.svg'
import svg2 from  './assets/assest/Next Invest - Landing Page (images)/2.svg'
import svg3 from  './assets/assest/Next Invest - Landing Page (images)/3.svg'
// import svg4 from  '.assets/assest/Next Invest - Landing Page (images)/4.svg'
import svg5 from  './assets/assest/Next Invest - Landing Page (images)/5.svg'
// import svg6 from  './assest/Next Invest - Landing Page (images)/6.svg'
// import svg7 from  './assest/Next Invest - Landing Page (images)/7.svg'
// import svg8 from  './assest/Next Invest - Landing Page (images)/8.svg'
// import svg9 from  './assest/Next Invest - Landing Page (images)/9.svg'
// import svg10 from './assest/Next Invest - Landing Page (images)/10.svg'
// import svg11 from './assest/Next Invest - Landing Page (images)/11.svg'
// import svg12 from './assest/Next Invest - Landing Page (images)/12.svg'
// import svg13 from './assest/Next Invest - Landing Page (images)/13.svg'
import svg14 from './assets/assest/Next Invest - Landing Page (images)/14.svg'
// import svg15 from './assest/Next Invest - Landing Page (images)/15.svg'
import svg16 from './assets/assest/Next Invest - Landing Page (images)/16.svg'
import logo1 from './assets/assest/Next Invest - Landing Page (Icons)/001-facebook.svg'
import logo2 from './assets/assest/Next Invest - Landing Page (Icons)/003-twitter.svg'
import logo3 from './assets/assest/Next Invest - Landing Page (Icons)/004-instagram.svg'
import logo4 from './assets/assest/Next Invest - Landing Page (Icons)/CaretDown.svg';
import Shape from './assets/assest/Next Invest - Landing Page (images)/Shape.svg'
import progress from './assets/assest/Next Invest - Landing Page (images)/Subtract.svg'


function Home() {

  const [cards,setcards ]=useState([]);
  
  useEffect(()=>{
  
    axios.get('https://fliper-invest-backend.onrender.com/api/v1/project/card/get-card')
    .then(cards=> setcards(cards.data))
    .catch(err=>console.log(err))
 },[])

 const [message, setMessage] = useState('');
 const [user, setUser] = useState({
 
  email:"",

 });

const handleInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setUser({ ...user, [name]: value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(user);

  try {
    const response = await fetch('https://fliper-invest-backend.onrender.com/api/v1/project/subscribe/subscribe-user', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    });

    const responseData = await response.json();
    if (response.status === 201) {
      setMessage(responseData.message);
      console.log("User Subscribe successfully");
    } else {
      
      
      setMessage(responseData.message || 'User not subscribe yet!');
    }
  } catch (error) {
    throw error
  }
}
function reset(){
  let inp=document.getElementById("rest");
  inp.value="";
}


const data=[
  {name:"Facebook",value:2000000000},
  {name:"Instagram",value:1500000000},
  {name:"Twitter",value:10000000000},
  {name:"Telegram",value:500000000},
]




return (
    <>
  <div id='1stpage'>
  <img src={svg3} alt="" className=' w-[100%]'  />
    <img src={svg5} alt="" className=' h-[65vh] absolute left-20 top-10 '/>
    <p className='text-5xl text-white absolute left-40 top-32'>Meaningful investments in <br /> Main Street businesses</p>
    <p className='absolute left-44 top-64 text-white'>Browse vetted investment offering in <br /> communities all over the Us.</p>
    <button className='h-10 w-40 mt-4 absolute left-48 top-80 text-white bg-green-600'>get stated</button>
  </div>

<div id='2ndpage' className=' w-[100%]   flex flex-wrap  align-center justify-top '>
  <div className="w-[100%] text-center">
  <p className="text-3xl font-bold">Offerings open for investement </p>
  <p className="font-semibold" >Explore pre-vetted investement opportunities avaliable in a growing <br />number of industry categories.</p>
  </div>
  <img src={Shape} alt="" className="h-44 w-44 mt-44" />
{
  cards.map(card=>{
    const totalRaised =card.get_price;
    const totalGoal = card.total_price;
    const percentageRaised = (totalRaised / totalGoal) * 100;

  return(
  
<div id='card' className=' w-[22%] ml-12 mt-10 mb-10 bg-white hover:shadow-xl  hover:border-4 hover:border-gray-600 hover:border-solid pb-4 '>
  <div id='img' className='bg-cover h-[32vh]  hover:hidden '>
  <img src={card.card_image} alt="" className="ml-8 content-box h-[100%] " />
    <div className='flex '>
      <div id='home' className='  p-2 pt-1 pb-1 text-md mt-4 ml-4 relative bottom-52'>home</div>
      <div id='family' className=' p-2 pt-1 pb-1 text-md mt-4 ml-4  relative bottom-52'>{card.tag}</div>
    </div>
 
  </div>
      <div id='title' className='pl-4 bg-slate-100'><p className='text-xl ml-3 font-bold'>{card.title}</p> <p className='mb-4 ml-3'>{card.location}</p><p className="ml-3 font-semibold">{card.description}</p> 
      
          <div style={{ width: '100%', textAlign: 'center' }}>
                <progress value={percentageRaised} max="100" style={{ width: '90%' }} className=""></progress>
          </div>

      <p><span className='text-green-600 ml-3'>$ {card.get_price}</span> raised of {card.total_price}</p>
      </div>


      <div id="flip" className="flex flex-col h-[60%]  justify-evenly mt-5 ">
        <hr />
           <p className="flex justify-between ml-3 mr-3"><span>Security Type</span> <span  className="font-semibold">{card.security_type}</span></p>
           <p className="flex justify-between ml-3 mr-3"><span>Investment_multiple</span> <span className="font-semibold">{card.investment_multiple}</span></p>
           <p className="flex justify-between ml-3 mr-3"><span>Maturity</span> <span className="font-semibold">{card.maturity}</span></p>
           <p className="flex justify-between ml-3 mr-3"><span>Min_investment</span> <span className="font-semibold">{card.min_investment}</span></p>
           <button className="h-[30%] w-[100%] bg-pink-600  text-white text-xl font-semibold self-end hover:bg-green-700 ">VIEW</button>
      </div>
</div>
  
)
    })
     }
 </div>
   
<div id='3rdpage' className='w-[100%] h-[80vh] bg-slate-200 mt-16'>
  <img src={svg14} alt="" className='h-[8vh] relative top-0 left-[90%]'/> 
   

 






   <img src={svg16} alt="" className='h-[40vh] relative top-20 left-[50%]'/>
   <img src={svg1} alt="" className='h-[55vh] relative bottom-[150px]' />
   <div className=' relative bottom-[520px] left-60'>
    <img src={progress} alt="" className="h-9" />
   <p className='font-bold text-4xl'>$7M+ paid out to <br /> investors</p>
   <p className='font-bold text-md text-gray-400 mt-10'>next invest is allready paid out over 7M in cash <br /> return to investors. Earn potential cash payments <br /> through unique revenue-share and debt financing <br /> investments</p>
   </div>
  </div>

<div id='4thpage' className='w-[100%] h-[100vh]  mt-40'>
  <div className='relative top-40 left-36'>
  <p className='font-bold text-4xl'>looking to raise capital <br /> for your growing <br /> business?</p>
  <p className='text-gray-400 text-md mt-8'>Whatever expanding or opening a brand-new <br /> concept, we make it easy to raise money from <br /> thousands of local investors</p>
  <button className='h-10 w-40 mt-4  text-white bg-green-700'>APPLY ONLINE</button>
  </div>
<img src={svg2} alt="" className='h-[65vh] relative bottom-40 left-[600px] ' />
</div>



<div className="h-[60vh]  ">
      <h1 className="text-3xl text-center font-semibold">Next Investement Trends</h1>
      <div className="mt-10">
        <PieChart >
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>









<div id='5thpage' className='h-[60vh] bg-slate-300 flex justify-evenly'>
  <div className='flex flex-col '>
<div>
<p className="mb-8 font-semibold mt-12">NEXT INVEST</p>
<p className='mb-28'>Copyright @2020 Legalprum. all right reserved</p>
</div>
  <div>


<div className=" border-pink-600  border-4 p-5">
<p  className="font-semibold">Subscribe to our newsletter</p>
<form onSubmit={handleSubmit}>
  <input 
  id="rest"
  type="email"
  className=' w-[60%] ' 
  placeholder='Email address'
  autoComplete="off"
  name="email"
  onChange={handleInput}
  
  />

  <button  onClick={reset} className=' bg-pink-600 w-10  h-6 z-1 relative top-1 '>
  <img className="h-6 rotate-[270deg]" src={logo4 } alt="" />
  </button>
  </form>

  {<p className='text-md text-green-700  mt-3'> {message} </p>} 
</div>

</div>
  </div>

  <div className='h-[100%] flex flex-col mt-12'>
    <ul className='h-[40%] flex flex-col justify-evenly '>
      <li  className='font-bold'>service</li>
      <li>email marketing</li>
      <li>compaigns</li>
      <li>Branding</li>
      <li>office</li>
    </ul>
  </div>

  <div className='h-[100%] flex flex-col mt-12'>
  <ul className='h-[40%] flex flex-col justify-evenly '>
      <li className='font-bold'>About</li>
      <li>Our Story</li>
      <li>Benefits</li>
      <li>team</li>
      <li>careers</li>
    </ul>
  </div>

  <div className="flex    mt-72">
    <img className="h-5 ml-5" src={logo1 } alt="" />
    <img className="h-5 ml-5" src={logo2 } alt="" />
    <img className="h-5 ml-5" src={logo3 } alt="" />
 
  </div>

</div>

</>
  )
}

export default Home




// import { useEffect, useState } from "react";
// import axios from "axios";
// import './home.css';
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   BarChart,
//   XAxis,
//   YAxis,
//   Legend,
//   CartesianGrid,
//   Bar,
// } from "recharts";
// import svg1 from './assest/Next Invest - Landing Page (images)/1.svg';
// import svg2 from './assest/Next Invest - Landing Page (images)/2.svg';
// // ... Other imports

// function Home() {
//   const [cards, setCards] = useState([]);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState({ email: "" });

//   useEffect(() => {
//     axios.get('https://fliper-invest-backend.onrender.com/api/v1/project/card/get-card')
//       .then(response => setCards(response.data))
//       .catch(err => console.log(err));
//   }, []);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://fliper-invest-backend.onrender.com/api/v1/project/subscribe/subscribe-user', {
//         method: "POST",
//         headers: { 'Content-Type': "application/json" },
//         body: JSON.stringify(user)
//       });
//       const responseData = await response.json();
//       if (response.status === 201) {
//         setMessage(responseData.message);
//       } else {
//         setMessage(responseData.message || 'User not subscribed yet!');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   function reset() {
//     document.getElementById("reset").value = "";
//   }

//   return (
//     <>
//       <div id="1stpage" className="relative">
//         <img src={svg3} alt="" className="w-full" />
//         <img src={svg5} alt="" className="h-[65vh] absolute left-5 md:left-20 top-10" />
//         <p className="text-xl md:text-5xl text-white absolute left-10 md:left-40 top-24 md:top-32">
//           Meaningful investments in <br /> Main Street businesses
//         </p>
//         <p className="text-white absolute left-12 md:left-44 top-40 md:top-64">
//           Browse vetted investment offerings in <br /> communities all over the US.
//         </p>
//         <button className="h-8 md:h-10 w-32 md:w-40 mt-4 absolute left-14 md:left-48 top-56 md:top-80 text-white bg-green-600">Get Started</button>
//       </div>

//       <div id="2ndpage" className="w-full flex flex-wrap justify-center py-10">
//         <div className="w-full text-center mb-10">
//           <p className="text-2xl md:text-3xl font-bold">Offerings Open for Investment</p>
//           <p className="font-semibold">
//             Explore pre-vetted investment opportunities available in a growing number of industry categories.
//           </p>
//         </div>
//         <img src={Shape} alt="" className="h-32 md:h-44 mb-16" />

//         {cards.map(card => {
//           const totalRaised = card.get_price;
//           const totalGoal = card.total_price;
//           const percentageRaised = (totalRaised / totalGoal) * 100;

//           return (
//             <div key={card.id} className="w-full md:w-1/4 p-4 mb-10 bg-white shadow hover:shadow-lg border border-transparent hover:border-gray-600 transition">
//               <div className="bg-cover h-[32vh] relative">
//                 <img src={card.card_image} alt="" className="w-full h-full object-cover" />
//                 <div className="absolute top-2 left-2 flex space-x-2">
//                   <span className="bg-slate-400 px-2 py-1 text-sm">{card.tag}</span>
//                 </div>
//               </div>
//               <div className="p-4 bg-slate-100">
//                 <p className="text-lg font-bold">{card.title}</p>
//                 <p>{card.location}</p>
//                 <p>{card.description}</p>
//                 <div className="w-full mt-2 text-center">
//                   <progress value={percentageRaised} max="100" className="w-full"></progress>
//                 </div>
//                 <p className="mt-2"><span className="text-green-600">${card.get_price}</span> raised of ${card.total_price}</p>
//               </div>
//               <div className="p-4 space-y-2">
//                 <p className="flex justify-between"><span>Security Type</span> <span className="font-semibold">{card.security_type}</span></p>
//                 <p className="flex justify-between"><span>Investment Multiple</span> <span className="font-semibold">{card.investment_multiple}</span></p>
//                 <p className="flex justify-between"><span>Maturity</span> <span className="font-semibold">{card.maturity}</span></p>
//                 <p className="flex justify-between"><span>Min Investment</span> <span className="font-semibold">{card.min_investment}</span></p>
//                 <button className="w-full py-2 bg-pink-600 text-white font-semibold hover:bg-green-700">VIEW</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Other sections */}
//       <div id='3rdpage' className='w-[100%] h-[80vh] bg-slate-200 mt-16'>
// //   <img src={svg14} alt="" className='h-[8vh] relative top-0 left-[90%]'/> 
   

 






// //    <img src={svg16} alt="" className='h-[40vh] relative top-20 left-[50%]'/>
// //    <img src={svg1} alt="" className='h-[55vh] relative bottom-[150px]' />
// //    <div className=' relative bottom-[520px] left-60'>
// //     <img src={progress} alt="" className="h-9" />
// //    <p className='font-bold text-4xl'>$7M+ paid out to <br /> investors</p>
// //    <p className='font-bold text-md text-gray-400 mt-10'>next invest is allready paid out over 7M in cash <br /> return to investors. Earn potential cash payments <br /> through unique revenue-share and debt financing <br /> investments</p>
// //    </div>
// //   </div>

// // <div id='4thpage' className='w-[100%] h-[100vh]  mt-40'>
// //   <div className='relative top-40 left-36'>
// //   <p className='font-bold text-4xl'>looking to raise capital <br /> for your growing <br /> business?</p>
// //   <p className='text-gray-400 text-md mt-8'>Whatever expanding or opening a brand-new <br /> concept, we make it easy to raise money from <br /> thousands of local investors</p>
// //   <button className='h-10 w-40 mt-4  text-white bg-green-700'>APPLY ONLINE</button>
// //   </div>
// // <img src={svg2} alt="" className='h-[65vh] relative bottom-40 left-[600px] ' />
// // </div>



// {/* // <div className="h-[60vh]  ">
// //       <h1 className="text-3xl text-center font-semibold">Next Investement Trends</h1>
// //       <div className="mt-10">
// //         <PieChart >
// //           <Pie
//             dataKey="users"
//             isAnimationActive={false}
//             data={data}
//             cx={200}
//             cy={200}
//             outerRadius={80}
//             fill="#8884d8"
//             label
//           />
//           <Tooltip />
//         </PieChart>
//         <BarChart
//           width={500}
//           height={300}
//           // data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 80,
//             bottom: 5,
//           }}
//           barSize={20}
//         >
//           <XAxis
//             dataKey="name"
//             scale="point"
//             padding={{ left: 10, right: 10 }}
//           />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
//         </BarChart>
//       </div>
//     </div> */}














      
//       <div id="5thpage" className="h-auto md:h-[60vh] bg-slate-300 flex flex-col md:flex-row justify-around items-start p-8">
//         <div className="flex flex-col">
//           <p className="mb-8 font-semibold">NEXT INVEST</p>
//           <p className="mb-28">Copyright ©2020 Legalprum. All rights reserved.</p>
//           <div className="border-pink-600 border-4 p-5">
//             <p className="font-semibold">Subscribe to our newsletter</p>
//             <form onSubmit={handleSubmit} className="flex">
//               <input 
//                 id="reset"
//                 type="email"
//                 className="w-3/4 p-2" 
//                 placeholder="Email address"
//                 autoComplete="off"
//                 name="email"
//                 onChange={handleInput}
//               />
//               <button type="submit" onClick={reset} className="w-1/4 bg-pink-600 p-2">
//                 <img className="h-6 rotate-[270deg]" src={logo4} alt="" />
//               </button>
//             </form>
//             {message && <p className="text-md text-green-700 mt-3">{message}</p>}
//           </div>
//         </div>

//         {/* Other columns */}







// </div>
//     </>
//   );
// }

// export default Home;