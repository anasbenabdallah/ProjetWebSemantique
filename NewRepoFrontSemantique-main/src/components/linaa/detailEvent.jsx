import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbarlist';
import './DetailEvent.css';

function DetailEvent() {
  const [events, setEvents] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [examinationData, setExaminationData] = useState([]); // Initialisez examinationData avec un tableau vide
  const name = useParams().name;

  useEffect(() => {
    axios
      .get('http://localhost:8081/fetchData3')
      .then((response) => {
        const data = response.data;
        const event = data.find((e) => e.eventName === name);
        setEvents(event);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      });

    axios
      .get(`http://localhost:8081/fetchData7?eventName=${name}`)
      .then((response) => {
        const data = response.data;
        setExaminationData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données d'examen:", error);
      });
  }, [name]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Navbar />
      <div className="detail-event-container">
        {events && (
          <div className="event-card">
            <h1>Détails de l'événement</h1>
            <p>
              <strong>Nom de l'événement:</strong> {events.eventName}
            </p>
            <p>
              <strong>Description:</strong> {events.eventDescription}
            </p>
            <p>
              <strong>Lieu:</strong> {events.eventLieu}
            </p>
            <p>
              <strong>Nom du programme associé:</strong> {events.programName}
            </p>
            <p>
              <strong>Heure du Début du programme:</strong> {events.programHeureDeb}
            </p>
            <p>
              <strong>Heure de Fin du programme:</strong> {events.programHeureFin}
            </p>
            <p>
              <strong>Jour du programme:</strong> {events.programJour}
            </p>
            
          </div>
        )}
       

        <button onClick={() => window.history.back()} className="back-button">
          Retour aux événements
        </button>
      </div>
    </div>
  );
}

export default DetailEvent;
