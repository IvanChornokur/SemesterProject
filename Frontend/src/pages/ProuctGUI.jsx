import { useState, useEffect } from "react";
import {REST,AUCTION, CHAT} from "../env/config.jsx";
import { json } from "react-router-dom";

export default function ProductGUI({userName, id, value,status}){
   const [bidData, setBidData] = useState({});

   const [bidStomp, setBidStomp] = useState(null);

   const [pendosWakeUp, setPendosWakeUp] = useState(false);


   const [inputBidValue, setInputBidValue] = useState(0);

   useEffect(()=>{
      const socket = new SockJS(AUCTION.connect);
      const bidStomp = Stomp.over(socket);

      bidStomp.connect({}, ()=> {
         fetch(AUCTION.currentBid(id)).then(res=>res.json()).then(data=>{
            // console.log(data);
            setBidData({value: data.amount, name: data.bidderName, status});
         }).catch(err=>{
            // console.log(value);
            // console.log(status);
            setBidData({value, name: "", status})
         })

         setBidStomp(bidStomp)
            bidStomp.subscribe(AUCTION.subscribe(id), (response)=>{
               // console.log("oleg");
               const data = JSON.parse(response.body);
               setBidData(data);
            });
         })
      return () => {
            if (bidStomp.connected) {
               bidStomp.disconnect();
            }
          };
      
   },[])
   return (<div className="product-gui">
      <div className="status-bar">
         <div className="status-status">
            <p>Status: <span className={bidData.status ? "status-active" : "status-closed"}>{bidData.status ? "active" : "closed"}</span></p>
         </div>
         <div className="bid-statu">
            <p>Current price: ${bidData.value}</p>
            <p>{bidData.name ? `last bidder: ${bidData.name}` : " "}</p>
            <p>{pendosWakeUp && "не можна так 🥺"}</p>
         </div>
      </div>
       { (bidData.status ? true : false) && <form className="input-bar" onSubmit={(e)=>{
         setPendosWakeUp(bidData.value >= inputBidValue);

         e.preventDefault();
         const sendData={
            value: inputBidValue,
            name: userName,
            status: 1
         }
         if (bidData.value < inputBidValue){
            bidStomp.send(AUCTION.sendTo(id),{}, JSON.stringify(sendData))
         }
      }}>
         <input disabled={bidData.status ? false : true} type="number" value={inputBidValue} onChange={({target})=>setInputBidValue(target.value)}/>
         <button>BID</button> 
      </form> }
   </div>)
}