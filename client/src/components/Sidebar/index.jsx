import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SideBarItem from "./sidebar-item";

import "./styles.css";
import logo from "../../assets/icons/Logo CVA 1.png";

import "bootstrap/dist/css/bootstrap.min.css";

function SideBar({ menu, loggedUser }) {
  const location = useLocation();

  const [active, setActive] = useState(1);

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [menu, location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <nav className="sidebar">
      <div>
        <div className="side-bar">
          <div className="logo-cva">
            <img src={logo} alt={`icon-logo`} width={130} />
          </div>
          <div className="menu">
            <div className="buttons-menu">
              {menu.map((item, index) => {
                if(item.onlyAdmins === true){
                  if(!loggedUser.isAdmin){
                    return null;
                  }
                }
                return (
                  <div key={index} onClick={() => __navigate(item.id)}>
                    <SideBarItem active={item.id === active} item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="down-content">
          <div className="bottom-bar-content row">
            <div className="col">
              <p className="bem-vindo">
                <strong>Seja bem vindo, Tiago!</strong>
              </p>
            </div>
            <div className="col-sm-1">
              <button className="exit">
                <img alt={"exit"} src={"../../assets/exit.png"} />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
}

export default SideBar;
