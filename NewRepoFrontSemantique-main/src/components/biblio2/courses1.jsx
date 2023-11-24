import  { useState, useEffect } from "react";
import axios from "axios";


const Courses1 = () => {
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    // Fetch the resource data from the endpoint
    axios
      .get("http://localhost:8081/fetchRessourceEtudiant") // Replace with your API endpoint
      .then((response) => {
        setResourceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resource data:", error);
      });
  }, []);

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
      <p>Glimpse of the Ressources shared by this Profile</p>

      {resourceData.length > 0 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              width: "200px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <img
              src={`/img/article.png`} // Construct the URL to the image
              alt={resourceData[0].nomRessource}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h3>{resourceData[2].nomRessource}</h3>
            <p>{resourceData[2].typeRessource}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses1;
