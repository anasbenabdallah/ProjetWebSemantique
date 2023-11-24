import { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [relations, setRelations] = useState([]);

  // Fetch all users
  useEffect(() => {
    axios.get("http://localhost:8081/getUsers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  // Fetch professor-student relationships
  useEffect(() => {
    axios.get("http://localhost:8081/getProfStu").then((response) => {
      setRelations(response.data);
    });
  }, []);

  // Search by name function
  const handleSearch = () => {
    axios
      .get("http://localhost:8081/searchByName", {
        params: { searchTerm: term },
      })
      .then((response) => {
        setSearchResults(response.data);
      });
  };

  return (
    <div className="container">
      {/* Display Users */}
      <h2 className="header">Users List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.Email} className="user-item">
            <strong>Name:</strong> {user.Nom}
            <br />
            <strong>Email:</strong> {user.Email}
            <br />
            <strong>UserType:</strong> {user.UserType}
            <br />
            {user.UserType === "Etudiant" && (
              <>
                <strong>Niveau Scolaire:</strong> {user.NiveauScolaire}
                <br />
              </>
            )}
            {user.UserType === "Professeur" && (
              <>
                <strong>Experience:</strong> {user.Expérience}
                <br />
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Search by Name */}
      <h2 className="header">Search by Name</h2>
      <div>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="search-list">
        {searchResults.map((user) => (
          <li key={user.Email} className="search-item">
            <strong>Name:</strong> {user.Nom}
            <br />
            <strong>Email:</strong> {user.Email}
            <br />
            <strong>UserType:</strong> {user.UserType}
          </li>
        ))}
      </ul>

      {/* Display Professor-Student Relationships */}
      <h2 className="header">Professor-Student Relationships</h2>
      <ul className="relation-list">
        {relations.map((relation) => (
          <li key={relation.professorEmail} className="relation-item">
            <strong>Professor:</strong> {relation.professorName} (
            {relation.professorEmail})<br />
            <strong>Student:</strong> {relation.studentName} (
            {relation.studentEmail})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
