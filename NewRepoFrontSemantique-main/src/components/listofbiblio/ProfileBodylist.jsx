import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import background from "../../assets/bgBrain.png";

const ProfileBodylist = () => {
  const [biblioEtudiantData, setBiblioEtudiantData] = useState([]);
  const [biblioProfData, setBiblioProfData] = useState([]);

  useEffect(() => {
    // Fetch the bibliographie data for biblioEtudiant
    axios
      .get("http://localhost:8081/fetchBiblioEtudiant")
      .then((response) => {
        if (response.data.length > 0) {
          const lastItem = response.data[response.data.length - 1];
          const scoreMatch = lastItem.score.match(/\d{3}/);
          const score = scoreMatch ? scoreMatch[0] : "";
          setBiblioEtudiantData([{ ...lastItem, score }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching biblioEtudiant data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the bibliographie data for biblioProf
    axios
      .get("http://localhost:8081/fetchBiblioProf")
      .then((response) => {
        if (response.data.length > 0) {
          const firstItem = response.data[0];
          setBiblioProfData([firstItem]);
        }
      })
      .catch((error) => {
        console.error("Error fetching biblioProf data:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      {/* Card for biblioEtudiant */}
      <Card
        style={{
          width: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          margin: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Biblio Etudiant
          </Typography>
          <Divider style={{ marginBottom: "15px" }} />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Bibliographie
          </Typography>
          {biblioEtudiantData.map((entry, index) => (
            <div key={index}>
              <Typography variant="body1" gutterBottom>
                <a href={`http://localhost:5173/biblio1`}>{`Bibliographie #${
                  index + 1
                }`}</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <a href={`http://localhost:5173/biblio2`}>
                  {" "}
                  {`Bibliographie #${index + 2}`}
                </a>
              </Typography>
              {/* <Typography variant="body1" gutterBottom>
              <a href={`http://localhost:5173/biblio3`}> {`Bibliographie #${index + 3}`}</a>
              </Typography> */}
            </div>
          ))}
          <Typography variant="body1" gutterBottom>
            Social:
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary">
              <InstagramIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>

      {/* Card for biblioProf */}
      <Card
        style={{
          width: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          margin: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Biblio Prof
          </Typography>
          <Divider style={{ marginBottom: "15px" }} />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Bibliographie
          </Typography>
          {biblioProfData.map((entry, index) => (
            <div key={index}>
              <Typography variant="body1" gutterBottom>
                <a href={`http://localhost:5173/biblioprof1`}>
                  {" "}
                  {`Bibliographie #${index + 1}`}
                </a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <a href={`http://localhost:5173/biblioprof2`}>
                  {" "}
                  {`Bibliographie #${index + 2}`}
                </a>
              </Typography>
              {/* <Typography variant="body1" gutterBottom>
                {`Bibliographie #${index + 3}`}
              </Typography> */}
            </div>
          ))}
          <Typography variant="body1" gutterBottom>
            Social:
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary">
              <InstagramIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBodylist;
