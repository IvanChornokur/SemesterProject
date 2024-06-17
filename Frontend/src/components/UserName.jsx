import { useState, useEffect } from "react";

import { Edit, Close } from "./UiIcons.jsx";

import "./UserName.scss";
function UserName({ userName, setUserName }) {
   const [showForm, setShowForm] = useState(false);
   useEffect(() => {
      setUserName(nm=>{
         const x = localStorage.getItem("username");
         if (x) return x;
         return "guest1234";
      })
   }, []);
   return (
      <div className="user-name">
         <div className={"overlay" + `${showForm ? " --active" : ""}`}>
            <EditForm setDisplayNameP={setUserName} showFormP={showForm} />
         </div>
         <div className={"container" + `${showForm ? " --active" : ""}`}>
            <span>{userName}</span>
            <div
               onClick={(e) => {
                  setShowForm((shF) => !shF);
               }}
            >
               {!showForm ? <Edit /> : <Close/>}
            </div>
         </div>
      </div>
   );
}

function EditForm({ setDisplayNameP, showFormP }) {
   const [userName, setUserName] = useState("");
   return (
         <form
            className="popapus"
            onSubmit={(e) => {
               e.preventDefault();
               setDisplayNameP((nm) => userName);
               localStorage.setItem("username", userName)
            }}
         >
            <label>
            <span>Set username</span>
            <input
            placeholder="name"
               type="text"
               value={userName}
               onChange={(e) => setUserName((nm) => e.target.value)}
            />
            </label>
            <button>Save</button>
         </form>
   );
}

export default UserName;
