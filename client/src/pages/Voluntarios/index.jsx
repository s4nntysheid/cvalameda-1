import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
//import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../fontawesome.css";

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

/* import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg"; */

library.add(faTrashCan);

function Voluntarios(props) {
  const [search, setSearch] = useState("");
  const [allVoluntarios, setAllVoluntarios] = useState(all_voluntarios);
  const [voluntarios, setVoluntarios] = useState(allVoluntarios);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [editVoluntario, setEditVoluntario] = useState({});

  /* MODAL 1 */
  const [showModal1, setShowModal1] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  /* MODAL 2 */
  const [showModal3, setShowModal3] = useState(false);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  const handleEditVoluntario = (voluntario) => setEditVoluntario(voluntario);

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
        console.log(filteredVoluntarios);
        setAllVoluntarios(filteredVoluntarios);
        setVoluntarios(sliceData(filteredVoluntarios, page, voluntPages));
        setPagination(calculateRange(filteredVoluntarios, voluntPages));
      }
    }
    /* setPagination(calculateRange(allVoluntarios, voluntPages));
    setVoluntarios(sliceData(allVoluntarios, page, voluntPages)); */
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

  const voluntaryAreas = editVoluntario.area;

  return (
    <div className="dashboard-content">
      {/* MODAL 1 */}
      <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>{editVoluntario.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-content">
            <form>
              <div className="contact-container">
                <div className="contact">
                  <img src={emailIcon} alt=" email-icon" className="email" />
                  <span>{editVoluntario.email}</span>
                </div>
                <div className="contact">
                  <img src={phoneIcon} alt="phone-icon" className="cell" />
                  <span>{editVoluntario.numero}</span>
                </div>
              </div>
              <div className="content-area">
                <div className="d-flex justify-content-between title-img">
                  <div className="mx-2 my-3">
                    <img
                      src={triangleIcon}
                      alt="areas-icon"
                      className="triangle"
                    />
                    <span className="my-auto mx-2">Áreas</span>
                  </div>
                  <div className="mx-2 my-auto">
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
                {console.log(voluntaryAreas)}

                {editVoluntario.area !== undefined ? (
                  editVoluntario.area.map((a, index) => {
                    return (
                      <div key={index}>
                        {console.log(a)}
                        <hr />
                        <div className="d-flex flex-row justify-content-between mx-2 m1rem">
                          <div className="mx-2 my-2">
                            <p className="">{a}</p>
                          </div>
                          <div className="mx-2 my-auto">
                            
                            <i class="fa-solid fa-trash" ></i>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            className={"save"}
            onClick={handleCloseModal1}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 2 */}
      {/* <Modal show={showModal3} onHide={handleCloseModal3}>
        <Modal.Header closeButton>
          <Modal.Title>Requisitos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-content">
            <div className="main2">
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Procurar..."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
              <div className="main">
                <h4>Casa do Oleiro</h4>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="danger">
                    <span className="bt-span">Falta</span>
                  </Button>
                  <Button variant="warning">
                    <span className="bt-span">Processo</span>
                  </Button>
                  <Button variant="success">
                    <span className="bt-span">Feito</span>
                  </Button>
                </Stack>
              </div>
              <div className="areas">
                <div className="areas-text">
                  <p className="Areas">Areas</p>
                </div>
                <div className="area-list">
                  <ul>
                    <li>
                      <input type="checkbox" />
                      Qualidade Total
                    </li>
                    <li>
                      <input type="checkbox" />
                      Liderança
                    </li>
                    <li>
                      <input type="checkbox" />
                      Intercessão
                    </li>
                    <li>
                      <input type="checkbox" />
                      comunicação
                    </li>
                    <li>
                      <input type="checkbox" />
                      Fotografia
                    </li>
                    <li>
                      <input type="checkbox" />
                      Stories
                    </li>
                    <li>
                      <input type="checkbox" />
                      Recepção
                    </li>
                    <li>
                      <input type="checkbox" />
                      Libertação
                    </li>
                    <li>
                      <input type="checkbox" />
                      Integração
                    </li>
                    <li>
                      <input type="checkbox" />
                      Libras
                    </li>
                    <li>
                      <input type="checkbox" />
                      Kids
                    </li>
                    <li>
                      <input type="checkbox" />
                      Acessível
                    </li>
                    <li>
                      <input type="checkbox" />
                      Trânsito
                    </li>
                    <li>
                      <input type="checkbox" />
                      Lider de Célula
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal3}>
            Fechar
          </Button>
          <Button
            variant="primary"
            className={"save"}
            onClick={handleCloseModal3}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal> */}

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
            <Link className="right-button-orange" to="/novovoluntario">
              <img alt="novo voluntario" src={cross} />
              {/* <span className="uper-span"><strong className="bt-text">Novo Voluntário</strong></span> */}
            </Link>
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
            <table>
              <tbody>
                {voluntarios.map((voluntario, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      handleShowModal1();
                      handleEditVoluntario(voluntario);
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
