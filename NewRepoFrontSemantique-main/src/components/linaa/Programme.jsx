import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbarlist';
import './popup.css';

function ListProg() {
  const [programs, setPrograms] = useState(null);
  const [publishedByData, setPublishedByData] = useState({});
  const [examinationData, setExaminationData] = useState([]);
  const [selectedProg, setSelectedProg] = useState(null);
  const [openPublishedByPopups, setOpenPublishedByPopups] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8081/fetchData5')
      .then((response) => {
        const data = response.data;
        setPrograms(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des programmes:', error);
      });

    axios
      .get('http://localhost:8081/fetchData3')
      .then((response) => {
        const data = response.data;
        setPublishedByData(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données publiées par:', error);
      });

    axios
      .get('http://localhost:8081/fetchData4')
      .then((response) => {
        const data = response.data;
        setExaminationData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données publiées par", error);
      });
  }, []);

  const openPublishedByPopup = (programName) => {
    setOpenPublishedByPopups({ ...openPublishedByPopups, [programName]: true });
  };

  const closePublishedByPopup = (programName) => {
    setOpenPublishedByPopups({ ...openPublishedByPopups, [programName]: false });
  };

  const openExaminationPopup = (program) => {
    setSelectedProg(program);
  };

  const closeExaminationPopup = () => {
    setSelectedProg(null);
  };

  const filteredPrograms = programs
    ? programs.filter((program) =>
        program.professorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <Navbar />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" style={titleStyle}>
            Liste des programmes
          </h5>

          <input
            type="text"
            placeholder="Rechercher par nom du professeur"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            style={searchStyle}
          />

          <ul className="list-group">
            {filteredPrograms.map((program) => (
              <li key={program.programName} className="list-group-item">
                <div>
                  <a href={'detailProg/' + program.programName} style={linkStyle}>
                    {program.programName}
                  </a>

                  <button onClick={() => openPublishedByPopup(program.programName)}>
                    Publié par
                  </button>
                  <button onClick={() => openExaminationPopup(program)}>
                    Parcouru par
                  </button>
                </div>

                {openPublishedByPopups[program.programName] && (
                  <div className="popup">
                    <div className="popup-content">
                      <div>Nom du professeur : {program.professorName}</div>
                      {publishedByData[program.programName] && (
                        <div>Données publiées par : {publishedByData[program.programName].someProperty}</div>
                      )}
                      <button onClick={() => closePublishedByPopup(program.programName)} className="close-button">
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedProg && (
        <div className="popup">
          <div className="popup-content">
            <h2>Programme : {selectedProg.programName}</h2>
            {examinationData
              .filter((data) => data.programName === selectedProg.programName)
              .length > 0 ? (
              <ul>
                {examinationData
                  .filter((data) => data.programName === selectedProg.programName)
                  .map((data, index) => (
                    <li key={index}>
                      <p><strong>Nom de la personne :</strong> {data.personName}</p>
                      <p><strong>nom du programme :</strong> {data.programName}</p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Personne n'a parcouru cet événement</p>
            )}
            <button onClick={closeExaminationPopup} className="close-button">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const titleStyle = {
  fontSize: '24px',
  textAlign: 'center',
  margin: '20px 0',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'blue',
};

const searchStyle = {
  marginBottom: '10px',
  padding: '5px',
  width: '100%',
};

export default ListProg;
