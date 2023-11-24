import { useState, useEffect } from "react";
import {
  Table,
  InputGroup,
  FormControl,
  Container,
  Pagination,
  Button,
} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./AdminPerformance.css";

function AdminPerformance() {
  const [performances, setPerformances] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const performancesPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8081/performances")
      .then((response) => response.json())
      .then((data) => setPerformances(data))
      .catch((error) => console.error("Error fetching performances: ", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const indexOfLastPerformance = currentPage * performancesPerPage;
  const indexOfFirstPerformance = indexOfLastPerformance - performancesPerPage;

  const filteredPerformances = performances
    .filter((performance) =>
      performance.Email.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(indexOfFirstPerformance, indexOfLastPerformance);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Admin Performances", 10, 10);

    const columns = ["Email", "Description", "Remarque", "Niveau"];
    const data = filteredPerformances.map((performance) => [
      performance.Email,
      performance.Description,
      performance.Remarque,
      performance.Niveau,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
    });

    doc.save("admin_performances.pdf");
  };

  return (
    <Container>
      <h2 className="my-4">Admin Performances</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by email"
          onChange={handleSearchChange}
          value={searchText}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Description</th>
            <th>Remarque</th>
            <th>Niveau</th>
          </tr>
        </thead>
        <tbody>
          {filteredPerformances.map((performance, index) => (
            <tr key={index}>
              <td>{performance.Email}</td>
              <td>{performance.Description}</td>
              <td>{performance.Remarque}</td>
              <td>{performance.Niveau}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from(
          {
            length: Math.ceil(
              filteredPerformances.length / performancesPerPage
            ),
          },
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
      <Button className="btn btn-primary" onClick={generatePDF}>
        Export to PDF
      </Button>
    </Container>
  );
}

export default AdminPerformance;
