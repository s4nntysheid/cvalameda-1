import React, { cloneElement, useRef, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { default as ptBR } from "date-fns/esm/locale/pt-BR";
import { IMaskInput } from "react-imask";

//import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/newvoluntario.css";

function NewVoluntario({closeModal, volunteer}) {
  registerLocale("pt-BR", ptBR);
  setDefaultLocale("pt-BR");
  
  const [areasList, setAreasList] = useState(["Qualidade", "Liderança", "Intercessão", "Comunicação", "Fotografia", "Stories", "Recepção", "Libertação", "Integração", "Libras", "Kids", "Acessível", "Trânsito", "Líder"]);
  

  //dados do usuário
  const name = useRef(null);
  const gender = useRef(null);
  const birthday = useRef(null);
  const cellphone = useRef(null);
  const email = useRef(null);
  const smallgroup = useRef(null);
  const member = useRef(null);
  const baptized = useRef(null);
  const escola = useRef(null);
  const cdo = useRef(null);
  const dna = useRef(null);
  const [areas, setAreas] = useState(volunteer?.area || ["Qualidade"]);
  const [interviews, setInterviews] = useState([]);

  const PhoneMask = "(00) 9 0000-0000";
  const EmailMask = /^\S*@?\S*$/;

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    var result = await fetch("/api/newvolunteer", {
      method: "POST",
      body: JSON.stringify({
        nome: name.current.value,
        sexo: gender.current.value,
        nascimento: birthday.current.value,
        numero: cellphone.current.value,
        email: email.current.value,
        celula: smallgroup.current.value,
        membro: member.current.value,
        batizado: baptized.current.value,
        escola: escola.current.value,
        cdo: cdo.current.value,
        dna: dna.current.value,
        areas: areas,
        entrevistas: interviews,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result);
    let jsonResult = await result;
    console.log(jsonResult);
    if (jsonResult) {
      console.log(areas);
      navigate("/");
      window.location.reload();
    } else {
      alert("babababababab");
    }
  };

  const handleAddArea = () => {
    var temp = [...areas];

    temp.push(areasList.find((e) => !areas.includes(e)));

    setAreas(temp);
  }

  const handleChangeArea = (oldArea, newarea) => {
    var temp = [...areas];
    const index = temp.indexOf(oldArea);

    temp[index] = newarea.target.value;

    setAreas(temp);
  }

  const handleAddInterview = (newinterviewarea) => {
    if(!interviews.includes(newinterviewarea)){
      var temp = [...interviews];
      temp.push(newinterviewarea);
      setInterviews(temp);
    }     
  }

  const deleteArea = (area) => {
    var temp = [...areas];
    var tempInterviews = [...interviews];
    const index = temp.indexOf(area);
    const indexInterview = tempInterviews.indexOf(area);
    temp.splice(index, 1)
    tempInterviews.splice(indexInterview, 1)
    setAreas(temp);
    setInterviews(tempInterviews);
  } 

  return (
    <div className="new-volunteers-container" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div className="dashboard-content-header" style={{marginBottom: 30}}>
        {volunteer ? <h2>Editar {volunteer.nome}</h2> : <h2>Novo Voluntário</h2>}
      </div>
      <form className="d-flex align-items-center newvolunt-form" method="post" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div className="form-container" style={{width: '100%', height: '100%', flex: 1, display: 'flex', flexDirection: 'column'}}>
          
          <div style={{flex: 1}}>
            <div className="form-row row">
              <div className="form-group col-md">
                <label htmlFor="nome">Nome</label>
                <input
                  defaultValue={volunteer?.nome}
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Nome"
                  ref={name}
                  required
                />
              </div>
              <div className="form-group col-md">
                <label htmlFor="sexo">Sexo</label>
                <select
                  defaultValue={volunteer?.sexo}
                  name="sexo"
                  id="sexo"
                  ref={gender}
                  required
                >
                  <option defaultValue>Escolha...</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </select>
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="nascimento">Nascimento</label>
                <input 
                  defaultValue={volunteer?.nascimento}
                  type="date" id="nascimento" name="nascimento" ref={birthday}/>
              </div>
            </div>

            <div className="form-row row mt-4">
              <div className="form-group col-md">
                <label htmlFor="numero">Número</label>
                <IMaskInput
                  mask={PhoneMask}
                  defaultValue={volunteer?.numero}
                  id="numero"
                  name="numero"
                  min={16}
                  placeholder="Ex.: (41) 9 9876-5432"
                  ref={cellphone}
                  required
                />
              </div>
              <div className="form-group col-md">
                <label htmlFor="email">Email</label>
                <IMaskInput
                  mask={EmailMask}
                  defaultValue={volunteer?.email}
                  name="email"
                  id="email"
                  placeholder="exemplo@exemplo.com"
                  ref={email}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="celula">Líder de Célula</label>
                <IMaskInput
                  mask={String}
                  defaultValue={volunteer?.celula}
                  name="celula"
                  id="celula"
                  ref={smallgroup}
                />
              </div>
            </div>

            <div className="labelSelector" style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 30}}>         
                  <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name="member"
                    id="member"
                    ref={member}
                    />Já é Membro
                  </label>

                  <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name="baptized"
                    id="baptized"
                    ref={baptized}
                    />Batizado
                  </label>
                
                  <label className="form-check-label">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name="escola"
                    id="escola"
                    ref={escola}
                    />Escola de Servos
                  </label>
                  
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cdo"
                      defaultChecked={volunteer?.cdo}
                      id="cdo"
                      ref={cdo}
                      /> Casa do Oleiro
                  </label>

                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="dna"
                      id="dna"
                      ref={dna}
                      /> DNA
                  </label>
            </div>

            <div className="form-row row checkboxes-row">
              <div className="form-group col-sm-2">
                <label>Áreas:</label>
              </div>
              {areas.map((area)=>(
                <>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                  <div style={{flex: 1}}>
                    <select value={area} name="area" style={{marginTop: 0}} onChange={(newarea) => handleChangeArea(area, newarea)} >
                      {areasList.map((areaFromList)=>(
                        !areas.includes(areaFromList) || areaFromList == area ? <option value={areaFromList}>{areaFromList}</option> : null
                      ))}
                    </select>
                  </div>
                  <div style={{height: '100%'}}>
                    <label className="form-check-label" style={{height: '100%', paddingInline: 16, display: 'flex', alignItems: 'center'}}>
                      <input
                        onChange={()=>handleAddInterview(area)}
                        className="form-check-input"
                        type="checkbox"
                        name="cdo"
                        id="cdo"
                        /> Já fez a entrevista com o Líder
                    </label>
                  </div>
                  { areas.length > 1 ? <div onClick={()=>deleteArea(area)} style={{display: 'flex', margin: 5, justifyContent: 'center', transform: 'rotate(45deg)', cursor: 'pointer'}}><svg viewBox="0 0 24 24" width="24" height="24" stroke="#888888" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></div>
                  : null}
                </div>
                </>
              ))}
              <div className="addArea" onClick={handleAddArea}>
                <div style={{marginRight: 10}}>Adicionar Área</div>
                  <div style={{display: 'flex', justifyContent: 'center'}}><svg viewBox="0 0 24 24" width="24" height="24" stroke="#888888" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></div>
                </div>
            </div>
          </div>


          <div style={{marginBlock: 30}}>
            <div className="form-row row" style={{marginTop: 20}}>
              <div className="col">
                <div onClick={closeModal} to="/voluntarios" className="btn btn-secondary">
                  Cancelar
                </div>
              </div>
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleOnSubmit}
                >
                  { volunteer ? "Atualizar": "Cadastrar"}
                </button>
              </div>
            </div>
          </div>


        </div>
      </form>
    </div>
  );
}

export default NewVoluntario;
