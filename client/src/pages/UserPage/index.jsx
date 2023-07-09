import React from "react";

/* import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit"; */

import "./css/userpage.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

const UserPage = (props) => {
  return (
    <section className="vh-100">
      <div className="d-flex justify-content-center container py-5 h-100">
        <div className="row align-items-center h-100">
          <div className="col mb-4 mb-lg-0">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 p-4 text-center">
                  <div className="row">
                    <h4 className="">
                      {props.user.name} ( {props.user.isAdmin === true ? "Admin" : "Usuário"} )
                    </h4>
                  </div>
                  <h6 className="">Áreas:</h6>
                  {props.user.areas.map((area) => {
                    return <p className="card-text border rounded">{area}</p>;
                  })}
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6 className="">Informações</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="row mb-3">
                        <h6 className="">Email</h6>
                        <p className="card-text text-muted">
                          {props.user.email}
                        </p>
                      </div>
                      <div className="row mb-3">
                        <h6 className="">Phone</h6>
                        <p className="card-text text-muted">
                          {props.user.phone}
                        </p>
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook me-3 fa-lg"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter me-3 fa-lg"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram me-3 fa-lg"></i>
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
