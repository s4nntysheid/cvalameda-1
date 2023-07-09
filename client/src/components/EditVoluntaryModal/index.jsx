import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import triangleIcon from '../../assets/icons/triangle.png';
import emailIcon from '../../assets/icons/email-icon.png';
import phoneIcon from '../../assets/icons/phone-icon.png';

import 'bootstrap/dist/css/bootstrap.min.css';

const EditVoluntaryModal = ({ handleCloseModal, showModal, voluntarios })=>{
  /* const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  
  if(handleShowModal == true) setShowModal(true) */

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{voluntarios.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-content">
            <div className="contact-container">
              <div className="contact">
                <img src={emailIcon} alt=" email-icon" className="email" />
                <span>{voluntarios.email}</span>
              </div>
              <div className="contact">
                <img src={phoneIcon} alt="phone-icon" className="cell" />
                <span>{voluntarios.numero}</span>
              </div>
            </div>

            <div className="content-area">
              <div className="title-img">
                <img src={triangleIcon} alt="areas-icon" className="triangle" />
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVoluntaryModal;
