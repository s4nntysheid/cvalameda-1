import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import "bootstrap/dist/css/bootstrap.min.css";

import order from "../../assets/icons/order.png";
import filter from "../../assets/icons/filter.png";
//import group from "../../assets/icons/group-by.png";
import cross from "../../assets/icons/cross.png";

/* import sharingBlack from '../../assets/icons/sharing-black.png';
import userIcon from '../../assets/icons/user.png';
import chartIcon from '../../assets/icons/chart.png'; */
import triangleIcon from "../../assets/icons/triangle.png";
import emailIcon from "../../assets/icons/email-icon.png";
import phoneIcon from "../../assets/icons/phone-icon.png";

import all_areas from "../../constants/areas";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";
/* import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg"; */

/*                       FIREBASE                        */

// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyBwGhu2BIuD9QVClN53W6wCO9-0qevQLyc",
  authDomain: "app-voluntariado-379416.firebaseapp.com",
  projectId: "app-voluntariado-379416",
  storageBucket: "app-voluntariado-379416.appspot.com",
  messagingSenderId: "834868529976",
  appId: "1:834868529976:web:ff40c6340f7d9065784fcd",
  measurementId: "G-DYERNVHDVZ"
};
 */
// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

function Areas() {
  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState(all_areas);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [editArea] = useState({});

  /* MODAL 1 */
  const [showModal1, setShowModal1] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  //const handleShowModal1 = () => setShowModal1(true);

  /* MODAL 2 */
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  //const handleShowModal2 = () => setShowModal2(true);

  /* MODAL 3 */
  const [showModal3, setShowModal3] = useState(false);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  //const handleEditArea = (area) => setEditArea(area);

  const areaPages = 50;

  useEffect(() => {
    setPagination(calculateRange(all_areas, areaPages));
    setAreas(sliceData(all_areas, page, areaPages));
  }, [page]);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = all_areas.filter((item) => {
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
      setPagination(calculateRange(search_results, areaPages));
      setAreas(sliceData(search_results, page, areaPages));
    } else {
      setPagination(calculateRange(all_areas, areaPages));
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setAreas(sliceData(all_areas, new_page, areaPages));
  };
  return (
    <div className="dashboard-content">
      {/* MODAL 1 */}
      <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>{editArea.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-content">
            <div className="contact-container">
              <div className="contact">
                <img src={emailIcon} alt=" email-icon" className="email" />
                <span>{editArea.email}</span>
              </div>
              <div className="contact">
                <img src={phoneIcon} alt="phone-icon" className="cell" />
                <span>{editArea.numero}</span>
              </div>
            </div>

            <div className="content-area">
              <div className="title-img">
                <img
                  src={triangleIcon}
                  alt="all_areas-icon"
                  className="triangle"
                />
                <h4>Áreas</h4>
              </div>

              <hr />
              <p>Qualidade Total</p>
              <hr />
              <p>comunicação</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Fechar
          </Button>
          <Button
            variant="primary"
            className={"save"}
            onClick={handleCloseModal1}
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 2 */}
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Voluntário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-content"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Fechar
          </Button>
          <Button
            variant="primary"
            className={"save"}
            onClick={handleCloseModal2}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 3 */}
      <Modal show={showModal3} onHide={handleCloseModal3}>
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
              <div className="all_areas">
                <div className="all_areas-text">
                  <p className="all_areas">all_areas</p>
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
            <button className="right-button">
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
            </button>
            {/* <button className="right-button">
              <img alt="agrupar" src={group} />
              <span className="uper-span"><strong className="bt-text">Agrupar por</strong></span>
            </button> */}
            <Link className="right-button-orange" to="/novaarea">
              <img alt="nova área" src={cross} />
              {/* <span className="uper-span"><strong className="bt-text">Novo Voluntário</strong></span> */}
            </Link>
          </div>
        </div>

        <table>
          {/* <thead>
            <th className="idT">ID</th>
            <th>NOME</th>
            <th>NÚMERO</th>
            <th>E-MAIL</th>
          </thead> */}

          {areas.length !== 0 ? (
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div>
                    <span>Selecionar todas</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="voluntnumber">
                      {all_areas.length} áreas
                    </span>
                  </div>
                </td>
              </tr>
              {areas.map((area, index) => (
                //                <Link to={`/${area.title.split(" ")[0].toLowerCase()}`}>
                <tr key={index}>
                  <td>
                    <input type="checkbox" name={index} />{" "}
                  </td>
                  {/* <td className="idT">
                    <span>{areas.id}</span>
                  </td> */}
                  <td>
                    <div>
                      <span>{area.title}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        alt="triangle-icon"
                        src={triangleIcon}
                        className={"icon"}
                      />
                      <span>{area.lider}</span>
                    </div>
                  </td>
                </tr>
                //                </Link>
              ))}
            </tbody>
          ) : null}
        </table>

        {areas.length !== 0 ? (
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

export default Areas;
