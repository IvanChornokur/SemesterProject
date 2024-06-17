import { NavLink, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import "./Home.scss";
// import "./HomeCheckbox.scss";

import { Plus } from "../components/UiIcons.jsx";

import { REST } from "../env/config.jsx";

import crocVsGaara from "/0jhkxqxb0n141.webp"

export default function Home() {
   const [trigger, setTrigger] = useState(false);
   const [auctions, setAuctions] = useState([]);
   const [filterIsClosed, setFilterIsClosed] = useState(0);
   const [filterSort, setFilterSort] = useState("new");

   const submitFilterForm = (e) => {
      e.preventDefault();
      // console.log(REST.getAll(filterIsClosed, filterSort));
      fetch(REST.getAll(filterIsClosed, filterSort))
         .then((res) => res.json())
         .then((data) => {
            setAuctions(data);
         });
   };

   useEffect(() => {
      // console.log(REST.getAll(0, "new"));
      fetch(REST.getAll(0, "new"))
         .then((res) => res.json())
         .then((data) => {
            setAuctions(data);
         });
   }, [trigger]);
   return (
      <main>
         <Outlet context={[setTrigger]} />
         <h1>Auctions</h1>
         <form className="filters" onSubmit={submitFilterForm}>
            <div className="filter-input">
               <span>Only active</span>
               <label className="custom-checkbox">
                  <input
                     type="checkbox"
                     checked={filterIsClosed}
                     onChange={({ target }) =>
                        setFilterIsClosed(target.checked ? 1 : 0)
                     }
                  />
                  <span className="checkmark"></span>
               </label>
            </div>
            <label className="filter-input">
               <span>Sort by</span>
               <div className="custom-select">
                  <select
                     value={filterSort}
                     onChange={({ target }) => setFilterSort(target.value)}
                  >
                     <option value="new">New</option>
                     <option value="old">Old</option>
                  </select>
               </div>
            </label>
            <button>refresh</button>
         </form>
         <ul className="product-container">
            <li>
               <NavLink className="create" to="/create">
                  <Plus />
                  <span>new auction</span>
               </NavLink>
            </li>
            {auctions &&
               auctions.map((el, i) => (
                  <ProductPreview
                     key={i}
                     id={el.id}
                     name={el.name}
                     description={el.description}
                     src={el.photo}
                     expireTime={el.expireTime}
                     status={el.status}
                  />
               ))}
                  <ProductPreview id={1} name={"годинник casio"} description={"працюють надійно, без перебоїв, Механіка висока фунціональність та солідний дизайн"} src={crocVsGaara}/>
         </ul>
      </main>
   );
}

function ProductPreview({ id, name, description, src, expireTime, status }) {
   status = status ? true : false;
   function convertDate(dateString) {
      let date = new Date(dateString);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      return `${String(day).padStart(2, "0")}.${String(month).padStart(
         2,
         "0"
      )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
   }
   return (
      <li className={`${status ? "open" : "closed"}`}>
         <div className={`data-container`}>
            <div className="left">
               <img src={src} />
            </div>
            <div className="right">
               <h3>{name}</h3>
               {/*<p>10 minutes</p>*/}
               {status ? (
                  <>
                     <p className="open">closes at: </p>
                     <p className="open">{convertDate(expireTime)}</p>
                  </>
               ) : (
                  <p className="closed">closed</p>
               )}

               <p>{description}</p>
            </div>
         </div>
         <NavLink className="details" to={`/auction/${id}`}>
            Details
         </NavLink>
      </li>
   );
}
