import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbarlist';
import './DetailProg.css'; // Importez le fichier CSS

function DetailProg() {
  const [program, setProgram] = useState(null); // Utilisez le nom de variable singulier pour la clarté
  const [showPopup, setShowPopup] = useState(false);
  const name = useParams().name;

  console.log(name);
  useEffect(() => {
    axios
      .get('http://localhost:8081/fetchData0')
      .then((response) => {
        const data = response.data;
        const program = data.find((e) => e.programName === name);
        setProgram(program);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      });
    // Effectuer une requête HTTP pour récupérer les détails du programme depuis votre backend
    
  }, []);

  // Fonction pour ouvrir le popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Fonction pour fermer le popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Navbar />
      <div className="detail-event-container">
        {program && (
          <div className="event-card">
            <h1>Détails du programme</h1>
            <p>
              <strong>Nom du programme:</strong> {program.programName}
            </p>
            <p>
              <strong>Jour du programme:</strong> {program.programJour}
            </p>
            <p>
              <strong>Heure de début:</strong> {program.programHeureDeb}
            </p>
            <p>
              <strong>Heure de fin:</strong> {program.programHeureFin}
            </p>
          </div>
        )}

        <button onClick={() => window.history.back()} className="back-button">
          Retour aux programmes
        </button>
      </div>
    </div>
  );
}

export default DetailProg;
