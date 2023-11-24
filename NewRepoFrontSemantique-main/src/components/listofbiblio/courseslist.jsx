import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Courseslist = () => {
  const [resourceData, setResourceData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);

  // Map between resource types and their corresponding images
  const resourceTypeImages = {
    Article: "/img/article.png",
    CourseRevision: "/img/coursrevision.png",
    Exercise: "/img/exercice.png",
    Guide: "/img/guide.png",
  };

  useEffect(() => {
    // Fetch the resource data from the endpoint
    axios
      .get("http://localhost:8081/fetchRessourceEtudiant")
      .then((response) => {
        setResourceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resource data:", error);
      });
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Make an HTTP request to the search endpoint with the search input value
    axios
      .get(`http://localhost:8081/getResourcesByType/${searchInput}`)
      .then((response) => {
        setFilteredResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered resource data:", error);
        setFilteredResources([]); // Clear the filteredResources in case of an error
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Ressources</h1>
      <p>Glimpse of the Ressources shared in our Platform</p>

      <Card style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Resources by Type
          </Typography>
          <Divider style={{ marginBottom: "15px" }} />
          <form onSubmit={handleSearchSubmit}>
            <TextField
              label="Search by Type"
              variant="outlined"
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {filteredResources.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredResources.map((resource, index) => (
            <Card key={index} style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
              <CardContent>
              <img
                  src={`/img/article.png`}
                  alt={resource.nomRessource}
                  style={{ width: "100%", height: "150px", objectFit: "contain" }}
                />
                <Typography variant="h5" component="div" style={{ margin: "10px 0" }}>
                  {resource.nomRessource}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {resource.typeRessource}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
};

export default Courseslist;
