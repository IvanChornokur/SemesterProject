import { Link, useParams } from "react-router-dom";
import "./ProductRoom.scss";
import {REST,AUCTION, CHAT} from "../env/config.jsx";
import { useState, useEffect } from "react";



import Chat from "./Chat.jsx";
import ProductGUI from "./ProuctGUI.jsx";

// const sssrc = "https://i.pinimg.com/236x/5e/f2/b5/5ef2b5d507f02118f2622b1c1c1ddd3a.jpg";
export default function ProductRoom({userName}) {
   const {id} = useParams();
   const [loadData, setLoadData] = useState({});
   const [expireTime, setExpireTime] = useState("");

   const [value, setValue] = useState(null);
   const [status, setStatus] = useState(0);

   useEffect(() => {
      // load data
      fetch(AUCTION.getOne(id)).then(res=>res.json()).then(data=>{
            setLoadData(data);
            console.log(data)
            setExpireTime(data.expireTime);
            setValue(data.startValue);
            setStatus(data.status);
         })
      
   },[])

   return (
      <>
         <div className="product-room-main">
            <section className="content">
               {loadData && expireTime && <ProductInfo data={loadData} expireTime={expireTime}/>}
               {value !== null && status !== null && <ProductGUI userName={userName} id={id} value={value} status={status}/>}

            </section>
            <Chat userName={userName} id={id}/>
         </div>
      </>

   );
}

function ProductInfo({data, expireTime}){
   const [timeDifference, setTimeDifference] = useState(0);
   useEffect(() => {
      const calculateMinutesRemaining = () => {
         const expirationDateTime = new Date(expireTime)
         expirationDateTime.setHours(expirationDateTime.getHours() + 2);
         const currentDate = new Date();
        
        // Calculate the difference in milliseconds
        setTimeDifference(Math.floor((expirationDateTime - currentDate) / (1000)));
      };
      calculateMinutesRemaining();
      const timerId = setInterval(calculateMinutesRemaining, 1000);
  
      return () => clearInterval(timerId);
    }, []);
   


    function formatTime(seconds) {
      // Ensure seconds is a non-negative integer
      seconds = Math.max(0, Math.floor(seconds));
  
      // Calculate minutes and remaining seconds
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
  
      // Format the time as "mm:ss"
      var formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  
      return formattedTime;
  }
   return (<div>
      <h1>{data.name}</h1>
      <div className="photo-and-text">
         <div className="photo-container">
            <img src={data.photo} />
         </div>
         <div className="text-container">
            <div className="top">
            <div className="product-description">
               <h4>Description:</h4>
               <p>{data.description}</p>
            </div>

            <div className="product-fund">
               <h4>Fund:</h4>
            <p>{data.fundStake}% of money will be given to {data?.fund?.name} fund</p>
            </div>

            <div className="contacts">
               <h4>Author and contacts:</h4>
               <p>Auhtor name: {data.authorName}</p>
               <p>Telegram: {data.contact}</p>
            </div>
            </div>

            <div className="product-expiration">
               <p>Time left: {formatTime(timeDifference)}</p>
            </div>
         </div>
      </div>
   </div>)
}


