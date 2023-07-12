import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
//import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../fontawesome.css";
import "./css/styles.css";

import order from "../../assets/icons/order.png";
import filter from "../../assets/icons/filter.png";
//import group from "../../assets/icons/group-by.png";
import cross from "../../assets/icons/cross.png";

//import sharingBlack from '../../assets/icons/sharing-black.png';
//import chartIcon from '../../assets/icons/chart.png';
import userIcon from "../../assets/icons/user.png";
import triangleIcon from "../../assets/icons/triangle.png";
import emailIcon from "../../assets/icons/email-icon.png";
import phoneIcon from "../../assets/icons/phone-icon.png";

import all_voluntarios from "../../constants/voluntarios";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import NewVoluntario from "../NewVoluntario";


function Voluntarios(props) {
  const [search, setSearch] = useState("");
  const [allVoluntarios, setAllVoluntarios] = useState(all_voluntarios);
  const [voluntarios, setVoluntarios] = useState(allVoluntarios);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [areas, setAreas] = useState(["Qualidade"]);
  const [areasList, setAreasList] = useState([
    "Qualidade",
    "Liderança",
    "Intercessão",
    "Comunicação",
    "Fotografia",
    "Stories",
    "Recepção",
    "Libertação",
    "Integração",
    "Libras",
    "Kids",
    "Acessível",
    "Trânsito",
    "Líder",
  ]);

  /* MODAL 1 */
  const [showModal1, setShowModal1] = useState(false);

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleShowModal1 = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowModal1(true);
  };

  const handleNewVolunteer = () => {
    console.log("Teste")
    setSelectedVolunteer(null);
    setShowModal1(true);
  }

  const handleAddArea = () => {
    var temp = [...selectedVolunteer.area];

    temp.push(areasList.find((e) => !areas.includes(e)));

    setSelectedVolunteer({
      ...selectedVolunteer,
      area: temp,
    });
  };

  const handleChangeArea = (oldArea, newarea) => {
    var temp = [...selectedVolunteer.area];
    const index = temp.indexOf(oldArea);

    temp[index] = newarea.target.value;

    setSelectedVolunteer({
      ...selectedVolunteer,
      area: temp,
    });
  };

  const deleteArea = (area) => {
    var temp = [...selectedVolunteer.area];
    const index = temp.indexOf(area);
    temp.splice(index, 1);
    setSelectedVolunteer({
      ...selectedVolunteer,
      area: temp,
    });
  };

  /* MODAL 3 */
  const [showModal3, setShowModal3] = useState(false);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  //const handleselectedVolunteer = (voluntario) => setselectedVolunteer(voluntario);

  const voluntPages = 50;

  useEffect(() => {
    if (props.loggedUser) {
      const admin = props.loggedUser.isAdmin;
      if (!admin) {
        const filteredVoluntarios = all_voluntarios.filter((voluntario) =>
          voluntario.area.some((area) =>
            props.loggedUser.areas.includes(area.toLowerCase())
          )
        );
        setAllVoluntarios(filteredVoluntarios);
        setVoluntarios(sliceData(filteredVoluntarios, page, voluntPages));
        setPagination(calculateRange(filteredVoluntarios, voluntPages));
      }
    }
  }, [page, props]);

  const handleOnClickRefresh = (event) => {
    window.location.reload(false);
  };

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = allVoluntarios.filter((item) => {
        let vol = item ? item : undefined;
        let volFirstName = vol ? vol.nome.split(" ")[0] : undefined;
        let volSecName = vol
          ? vol.nome.split(" ")[vol.nome.split(" ").length - 1]
          : undefined;
        let searchedVol =
          volFirstName.toLowerCase().includes(search.toLowerCase()) ||
          volSecName.toLowerCase().includes(search.toLowerCase());
        return searchedVol;
      });
      setPagination(calculateRange(search_results, voluntPages));
      setVoluntarios(sliceData(search_results, page, voluntPages));
    } else {
      setPagination(calculateRange(allVoluntarios, voluntPages));
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setVoluntarios(sliceData(allVoluntarios, new_page, voluntPages));
  };

  return (
    <div className="dashboard-content">
      {/* MODAL 1 */}
        <Modal show={showModal1} onHide={handleCloseModal1}>
          <Modal.Body>
            <NewVoluntario closeModal={handleCloseModal1} volunteer={selectedVolunteer} />
          </Modal.Body>
        </Modal>

      {/* <DashboardHeader /> */}
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Voluntários</h2>
          {/* <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div> */}
          <div className="dashbord-header-right row">
            {/* <button className="right-button">
              <img alt="ordenar" src={order} />
              <span className="uper-span">
                <strong className="bt-text">Ordenar por</strong>
              </span>
            </button>
            <button className="right-button" onClick={handleShowModal3}>
              <img alt="filtros" src={filter} />
              <span className="uper-span">
                <strong className="bt-text">Filtrar</strong>
              </span>
            </button> */}
            {/* <button className="right-button">
              <img alt="agrupar" src={group} />
              <span className="uper-span"><strong className="bt-text">Agrupar por</strong></span>
            </button> */}
            <div style={{cursor: 'pointer'}} onClick={handleNewVolunteer} className="right-button-orange">
              <img alt="novo voluntario" src={cross} />
              {/* <span className="uper-span"><strong className="bt-text">Novo Voluntário</strong></span> */}
            </div>
          </div>
        </div>
        {voluntarios.length !== 0 ? (
          <>
            <div className="row w-100 up-volunteers p-1">
              <div className="col d-flex align-items-center">
                <span className="">{voluntarios.length} voluntários</span>
              </div>
              <div className="col">
                <button
                  className="refresh-button"
                  onClick={handleOnClickRefresh}
                >
                  <i class="fa-solid fa-rotate-right"></i>
                </button>
              </div>
            </div>
            <table style={{ fontWeight: 300 }}>
              <thead>
                <tr>
                  <th>Nomes</th>
                  <th>Áreas</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                {voluntarios.map((voluntario, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      handleShowModal1(voluntario);
                    }}
                  >
                    {/* <td className="idT">
                    <span>{voluntarios.id}</span>
                  </td> */}
                    <td>
                      <div>
                        <img
                          alt="voluntary"
                          src={userIcon}
                          className={"icon user-icon"}
                        />
                        <span>{voluntario.nome}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <img
                          alt="triangle"
                          src={triangleIcon}
                          className={"icon"}
                        />
                        <span>{voluntario.area.join(", ")}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <img alt="email" src={emailIcon} className={"icon"} />
                        <span>{voluntario.email}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <img alt="phone" src={phoneIcon} className={"icon"} />
                        <span>{voluntario.numero}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {voluntarios.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Voluntarios;
