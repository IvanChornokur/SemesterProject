import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import "./ProductForm.scss";

import { REST } from "../env/config.jsx";

export default function ProductForm({ userName }) {
   const redirect = useNavigate();

   const [setTrigget] = useOutletContext();

   // photo
   const [image, setImage] = useState(null);
   const formData = new FormData();
   formData.append("file", image);

   const imageSize = image?.size ? image?.size > 1000000 : false;
   // photo visual
   const imageName = image && image.name;
   const imageSrc = image && URL.createObjectURL(image);

   // name
   const [name, setName] = useState("");

   // description
   const [desc, setDesc] = useState("");

   // author
   const [authorName, setAuthorName] = useState(userName);

   // contact
   const [contact, setContanct] = useState("");

   const step1Inputs = {
      setImage,
      imageSize,
      imageName,
      imageSrc,
      name,
      setName,
      desc,
      setDesc,
      authorName,
      setAuthorName,
      contact,
      setContanct
   };

   // price
   const [price, setPrice] = useState("");

   // fundType
   const [fund, setFund] = useState("1");

   // fundType
   const [fundPercentage, setFundPercentage] = useState("50");

   // expiraion
   const [minutes, setMinutes] = useState("");

   const step2Inputs = {
      price,
      setPrice,
      fund,
      setFund,
      fundPercentage,
      setFundPercentage,
      minutes,
      setMinutes
   };

   function generateExpirationDate(mins) {
      const currentDate = new Date();
      const newDate = new Date(currentDate.getTime() + mins * 60000);
      return newDate;
   }

   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, []);

   const [loading, setLoaing] = useState("");

   const submit = (e) => {
      e.preventDefault();
      if (imageSize) return;
      console.log([imageName,name, desc, authorName, contact, price, minutes]);
      const invalid = [imageName, name, desc, authorName, contact, price, minutes].some(
         (el) => {
            // console.log(el);
            // console.log(el.trim() === "");
            return el ? el.trim() === "" : true;
         }
      );
      console.log("oleg");
      console.log(invalid);
      if (invalid) {
         setLoaing("Error all fieds must be filled");
         return;
      }

      const urlData =
         `?name=${name}&description=${desc}` +
         `&authorName=${authorName}&contact=${contact}` +
         `&price=${price}&fund=${fund}` +
         `&fundPercentage=${fundPercentage}` +
         `&expirationTime=${minutes}`;
      console.log(REST.postCreate + urlData);
      setLoaing("loading");
      fetch(REST.postCreate + urlData, {
         method: "POST",
         body: formData
      }).then(({ status }) => {
         if (`${status}`[0] === "2") {
            setLoaing("success");
            console.log(status);
            setTrigget((tr) => !tr);
            redirect("/");
         }
      });
   };

   const [step, setStep] = useState(1);
   return (
      <div className="overlayF">
         <form className="product-form" onSubmit={submit}>
            {step === 1 && (
               <PhotoAuthorStep {...step1Inputs} setStep={setStep} />
            )}
            {step === 2 && (
               <PriceFundStep
                  {...step2Inputs}
                  setStep={setStep}
                  loading={loading}
               />
            )}
         </form>
      </div>
   );
}

function PhotoAuthorStep({
   setImage,
   imageSize,
   imageName,
   imageSrc,
   name,
   setName,
   desc,
   setDesc,
   authorName,
   setAuthorName,
   contact,
   setContanct,
   setStep
}) {
   return (
      <fieldset>
         <NavLink className="back" to="/">
            {" "}
            {"<"} Back
         </NavLink>
         <label className="photo">
            <div className="photoView">
               {imageSrc && <img src={imageSrc} />}
               <p>{imageName ? imageName : "insert photo (max 1.0 MB)"}</p>
               {imageSize && (
                  <p style={{ color: "#dc4c64" }}>
                     photo is too large (max 1.0 MB)
                  </p>
               )}
            </div>
            <input
               type="file"
               onChange={({ target }) => {
                  const fileX = target.files[0];
                  fileX && setImage(fileX);
               }}
               hidden
            />
         </label>
         <label className="name">
            <span>Product name</span>
            <input
               name="name"
               type="text"
               value={name}
               onChange={({ target }) => setName(() => target.value)}
            />
         </label>
         <label className="description">
            <span>Description</span>
            <textarea
               rows={3}
               type="text"
               value={desc}
               onChange={({ target }) => setDesc(() => target.value)}
            />
         </label>
         <fieldset className="line-inputs">
            <label className="author-name">
               <span>Author</span>
               <input
                  type="text"
                  value={authorName}
                  onChange={({ target }) => setAuthorName(() => target.value)}
               />
            </label>
            <label className="contact">
               <span>Contact</span>
               <input
                  placeholder="telegram"
                  type="text"
                  value={contact}
                  onChange={({ target }) => setContanct(() => target.value)}
               />
            </label>
         </fieldset>
         <button className="next" onClick={() => setStep(2)}>
            Next {">"}
         </button>
      </fieldset>
   );
}

function PriceFundStep({
   price,
   setPrice,
   fund,
   setFund,
   fundPercentage,
   setFundPercentage,
   minutes,
   setMinutes,
   setStep,
   loading,
   validForm
}) {
   return (
      <fieldset>
         <p className="back" onClick={() => setStep(1)}>
            {"<"} Back
         </p>
         <label className="price">
            <span>Start price (in USD)</span>
            <input
               placeholder="400"
               type="number"
               value={price}
               onChange={({ target }) => setPrice(() => target.value)}
            />
         </label>
         <fieldset className="line-inputs">
            <label className="fund">
               <span>Fund</span>
               <select
                  value={fund}
                  onChange={({ target }) => setFund(() => target.value)}
               >
                  <option value="1">Фонд сергія притули</option>
                  <option value="2">Save life</option>
                  <option value="3">KSE</option>
                  <option value="4">KOLO</option>
               </select>
            </label>
            <label className="fund-percentage">
               <span>Fund percentage</span>
               <select
                  value={fundPercentage}
                  onChange={({ target }) =>
                     setFundPercentage(() => target.value)
                  }
               >
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="90">90%</option>
                  <option value="100">100%</option>
               </select>
            </label>
         </fieldset>
         <label htmlFor="" className="minutes">
            <span>Expiration time (in minutes)</span>
            <input
               type="number"
               value={minutes}
               placeholder="10"
               onChange={({ target }) => setMinutes(() => target.value)}
            />
         </label>
         {loading && <p className={loading.split(" ")[0]}>{loading}</p>}
         {loading !== "loading" && <button className="next">Submit</button>}
         {/* {!validForm && <p className="invalid">Invalid: not all fields are filled*</p>} */}
      </fieldset>
   );
}
