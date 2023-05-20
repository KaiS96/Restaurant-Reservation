import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    // <div>
    //   <div class="card text-center text-bg-dark">
    //     <div class="card-header">
    //       <ul class="nav nav-tabs card-header-tabs">
    //         <li class="nav-item">
    //           {/* <nav className="navbar navbar-dark align-items-start p-0">
    //   <div className="container-fluid d-flex flex-column p-0"> */}
    //           <Link
    //             className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
    //             to="/"
    //           >
    //             <div className="sidebar-brand-text mx-3">
    //               <span>Periodic Tables</span>
    //             </div>
    //           </Link>
    //           <hr className="sidebar-divider my-0" />
    //           <ul className="nav navbar-nav text-light" id="accordionSidebar">
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/dashboard">
    //                 <span className="oi oi-dashboard m-1" />
    //                 &nbsp;Dashboard
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/search">
    //                 <span className="oi oi-magnifying-glass m-1" />
    //                 &nbsp;Search
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/reservations/new">
    //                 <span className="oi oi-plus m-1" />
    //                 &nbsp;New Reservation
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/tables/new">
    //                 <span className="oi oi-layers m-1" />
    //                 &nbsp;New Table
    //               </Link>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   {/* </nav> */}
    // </div>
    <div>
      <div className="card text-left bg-dark">
        <div className="card-header">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="navbar-brand text-white" to="/">
                <span>Periodic Tables</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                <span className="oi oi-dashboard m-1" />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/search">
                <span className="oi oi-magnifying-glass m-1" />
                &nbsp;Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/reservations/new">
                <span className="oi oi-plus m-1" />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tables/new">
                <span className="oi oi-layers m-1" />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
