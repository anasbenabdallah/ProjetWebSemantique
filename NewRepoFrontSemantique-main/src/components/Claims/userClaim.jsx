import React, { useState, useEffect } from "react";
import {
  Table,
  InputGroup,
  FormControl,
  Container,
  Button,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./claims.css";

function UserClaim() {
  const [claims, setClaims] = useState([]);
  const [searchText, setSearchText] = useState("fathi"); // Set the default search term to "fathi"
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const claimsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8081/claims")
      .then((response) => response.json())
      .then((data) => setClaims(data))
      .catch((error) => console.error("Error fetching claims: ", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const filteredClaims = claims
    .filter((claim) => {
      if (filterStatus === "Tous") {
        return true;
      } else {
        return claim.StatusReclamation === filterStatus;
      }
    })
    .filter((claim) =>
      claim.Email.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(indexOfFirstClaim, indexOfLastClaim);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    if (status === "Unprocessed") {
      return "text-danger";
    } else if (status === "Processed") {
      return "text-success";
    } else {
      return "";
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("User Claims", 10, 10);

    const columns = [
      "Claim Number",
      "Email",
      "Title Reclamation",
      "Content",
      "Status Reclamation",
    ];
    const data = filteredClaims.map((claim) => [
      claim.NumReclamation,
      claim.Email,
      claim.TitreReclamation,
      claim.ContenuReclamation,
      claim.StatusReclamation,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
    });

    doc.save("user_claims.pdf");
  };

  return (
    <Container>
      <h2 className="my-4">User Claims</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by email"
          onChange={handleSearchChange}
          value={searchText}
        />
      </InputGroup>
      <br></br>
      <div>
        <label htmlFor="filterStatus">Status: </label>
        <select
          id="filterStatus"
          onChange={handleFilterChange}
          value={filterStatus}
        >
          <option value="Tous">Tous</option>
          <option value="Unprocessed">Unprocessed</option>
          <option value="Processed">Processed</option>
          {/* Add more status options as needed */}
        </select>
      </div>
      <br></br>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N°</th>
            <th>Email</th>
            <th>Title Reclamation</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim, index) => (
            <tr key={index}>
              <td>{claim.NumReclamation}</td>
              <td>{claim.Email}</td>
              <td>{claim.TitreReclamation}</td>
              <td>{claim.ContenuReclamation}</td>
              <td className={getStatusColor(claim.StatusReclamation)}>
                {claim.StatusReclamation}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredClaims.length / claimsPerPage) },
          (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>

      <Button onClick={generatePDF}>Export to PDF</Button>
    </Container>
  );
}

export default UserClaim;
