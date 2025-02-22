import React, { useEffect } from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import avatarImage from '../assests/avatarImg.png';
import { Link } from 'react-router-dom';
// import { useUser } from '../containers/UserContext';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { FaChevronDown } from 'react-icons/fa';
// import Cookies from 'js-cookie';
// import { UserButton, useUser } from "@clerk/clerk-react";
// import { Input } from 'react-bootstrap'
// import userLogo from '../assests/User.png'
// import { useSelector } from "react-redux";


const Navbar = ({ Toggle }) => {
  // const { user } = useUser();

  // useEffect(() => {
  //   if (user) {
  //     console.log("User Name:", user.username);
  //   }
  // }, [user]);
  // const { user } = useSelector((state) => state.auth);


  return (
    <>
      <nav class="navbar navbar-expand-lg bg-white">
      <i className="navbar-brand bi bi-justify-left ms-3" onClick={Toggle}></i>
        <button className="navbar-toggler m-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <p className="text-black nav-link">
                Welcome to{" "}
               
              </p>
            </li>
          </ul>
          {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li> */}
          {/* </ul> */}

        </div>

      </nav>
    </>
  );
};

export default Navbar;