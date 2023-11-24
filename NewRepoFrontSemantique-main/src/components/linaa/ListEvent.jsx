import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbarlist';
import './ListEvent.css';

function ListEvent() {
  const [events, setEvents] = useState(null);
  const [examinationData, setExaminationData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [conferenceData, setConferenceData] = useState([]); 
  const [filterCriteria, setFilterCriteria] = useState({
    minParticipants: 0,
    maxParticipants: 1000,
  });
  const [sortDirection, setSortDirection] = useState('asc'); 

  useEffect(() => {
    axios
      .get('http://localhost:8081/fetchData1')
      .then((response) => {
        const data = response.data;
        setEvents(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      });

    axios
      .get('http://localhost:8081/fetchData7')
      .then((response) => {
        const data = response.data;
        setExaminationData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données d'examen:", error);
      });

    axios
      .get('http://localhost:8081/fetchData11') 
      .then((response) => {
        const data = response.data;
        setConferenceData(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de la conférence:', error);
      });
  }, []);

  if (!events || !conferenceData) {
    return <div>Chargement...</div>;
  }

  const openPopup = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter((event) => {
    return event.eventName.toLowerCase().includes(search.toLowerCase());
  });

  const applyConferenceFilter = (data) => {
    const { minParticipants, maxParticipants } = filterCriteria;
    return data.filter((conference) => {
      const participants = parseInt(conference.eventnbre, 10);
      return participants >= minParticipants && participants <= maxParticipants;
    });
  };

  const sortConferenceData = (data, direction) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const participantsA = parseInt(a.eventnbre, 10);
      const participantsB = parseInt(b.eventnbre, 10);

      if (direction === 'asc') {
        return participantsA - participantsB;
      } else {
        return participantsB - participantsA;
      }
    });
    return sortedData;
  };

  const renderConferenceData = () => {
    const filteredData = applyConferenceFilter(conferenceData);
    const sortedData = sortConferenceData(filteredData, sortDirection);

    return (
      <div className="conference-data">
        <h2> les Conférences</h2>
        <div className="conference-filter">
          <input
            type="number"
            placeholder="Min participants"
            value={filterCriteria.minParticipants}
            onChange={(e) =>
              setFilterCriteria({ ...filterCriteria, minParticipants: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max participants"
            value={filterCriteria.maxParticipants}
            onChange={(e) =>
              setFilterCriteria({ ...filterCriteria, maxParticipants: e.target.value })
            }
          />
          <button onClick={() => setSortDirection('asc')}>Trier Ascendant</button>
          <button onClick={() => setSortDirection('desc')}>Trier Descendant</button>
        </div>
        <ul>
          {sortedData.map((conference, index) => (
            <li key={index} className="conference-item">
              <strong>Nom de l'événement:</strong> {conference.eventName}
              <br />
              <strong>Description:</strong> {conference.eventDescription}
              <br />
              <strong>Lieu:</strong> {conference.eventLieu}
              <br />
              <strong>Nombre de participants:</strong> {conference.eventnbre}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="list-event">
      <Navbar />
   
      <div className="event-list">
        <input
          type="text"
          placeholder="Rechercher par nom d'événement"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <ul className="event-ul">
          {filteredEvents.map((event, index) => (
            <li key={index} className="event-li">
              <a href={'detailEvent/' + event.eventName} className="event-link">
                {event.eventName}
              </a>
              <button onClick={() => openPopup(event)} className="popup-button">
                Examiné par
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <h2>Examen de l'événement : {selectedEvent.eventName}</h2>
            <ul>
              {examinationData
                .filter((data) => data.eventName === selectedEvent.eventName)
                .map((data, index) => (
                  <li key={index}>
                    <p><strong>Nom du visiteur :</strong> {data.personNames}</p>
                    <p><strong>Événement examiné :</strong> {data.eventName}</p>
                  </li>
                ))}
            </ul>
            <button onClick={closePopup} className="close-button">
              Fermer
            </button>
          </div>
        </div>
      )}
      {conferenceData.length > 0 && renderConferenceData()}
    </div>
  );
}

export default ListEvent;
