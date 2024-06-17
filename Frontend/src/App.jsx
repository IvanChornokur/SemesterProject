import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import UserName from "./components/UserName.jsx";
import Layout from "./Layout.jsx";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import ProductRoom from "./pages/ProductRoom.jsx";
import Funds from "./pages/Funds.jsx";
import Info from "./pages/info.jsx";

function App() {
   const [userName, setUserName] = useState("")
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout userName={userName} setUserName={setUserName} />}>
               <Route path="/" element={<Home/>}>
                  <Route path="/create" element={<ProductForm userName={userName}/>}/>
               </Route>
               <Route path="/auction/:id" element={<ProductRoom userName={userName}/>}/>
               <Route path="/funds" element={<Funds />}/>
               <Route path="/credits" element={<Info />}/>
               </Route>   
         </Routes>
      </BrowserRouter>
   );
}



export default App;
