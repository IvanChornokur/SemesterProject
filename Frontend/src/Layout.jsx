import { Outlet, NavLink } from "react-router-dom";
import UserName from "./components/UserName";

import { useState } from "react";

import Logo from "/Logo.svg";

import "./Layout.scss"
function Layout({userName, setUserName}) {
   return (
      <>
         <header className="header">
            <nav>
               <ul>
                  <li>
                     <NavLink to="/"><img className="logo" src={Logo} alt=""/></NavLink>
                  </li>
                  <li>
                     <NavLink to="funds">Funds</NavLink>
                  </li>
               </ul>
                     <UserName userName={userName} setUserName={setUserName}/>
            </nav>
         </header>
         <Outlet />
         <footer className="footer">CharitX inc. <NavLink to="/credits">Credits</NavLink></footer>
      </>
   );
}

export default Layout;
