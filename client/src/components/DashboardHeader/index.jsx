import React from "react";

import "./styles.css";
/* import NotificationIcon from "../../assets/icons/notification.svg";
import SettingsIcon from "../../assets/icons/settings.svg"; */

import order from "../../assets/icons/order.png";
import filter from "../../assets/icons/filter.png";
import group from "../../assets/icons/group-by.png";
import cross from "../../assets/icons/cross.png";


function DashboardHeader({ onClick }) {


  return (
    <div className="dashbord-header-container">
      <div className="row">

        <button className="right-button">
          <img src={order} />
          <span className="uper-span"><strong className="bt-text">Ordenar por</strong></span>
        </button>
        <button className="right-button">
          <img src={filter} />
          <span className="uper-span"><strong className="bt-text">Filtros</strong></span>
        </button>
        <button className="right-button">
          <img src={group} />
          <span className="uper-span"><strong className="bt-text">Agrupar por</strong></span>
        </button>
        <button className="right-button-orange">
          <img src={cross} />
          <span className="uper-span"><strong className="bt-text">Novo Voluntário</strong></span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
