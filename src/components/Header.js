import { useState } from "react";
import { LOGO_URL } from "../../utils/constants";
const Header = () => {
  //normal js variable
  // let btnName = "login";
  const [btnNameReact,setbtnNameReact]=useState("login")
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} className="logo" alt="logo" />
      </div>
      <div className="links-container">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
          <li>
            <a>Cart</a>
          </li>
          {/* <button className="login" onClick={() => {btnName = "log-out";
              console.log(btnName)} }>
            {btnName}
          </button> */}
          <button className="login" 
          onClick={() =>{
            btnNameReact==="login" ?setbtnNameReact("logout"):setbtnNameReact("login")
          } }>
            {btnNameReact}
          </button>
         
        </ul>
      </div>
    </div>
  );
};

export default Header;
