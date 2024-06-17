import { useEffect, useState } from "react"
import "./Funds.scss"

import {REST} from "../env/config.jsx";

export default function Funds(){
   const [funds, setFunds] = useState([]);
   
   useEffect(()=>{
      fetch(REST.getFunds).then(res=>res.json()).then(data=>{
         setFunds(data);
      })
   },[])
   return (<main>
      <h1>Funds</h1>
      {funds && <ul className="funds">
         {funds.map((el,i)=><Fund key={i} name={el.name} money={el.value}/>)}
      </ul>}
   </main>)
}

function Fund({name, money}){
   return (<li className="fund">
      <h2 style={{textAlign: "center"}}>{name}</h2>
      <p style={{textAlign: "center"}}>${money}</p>
   </li>)
}