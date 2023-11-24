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

const ProfileBody1 = () => {
  const [bibliographieData, setBibliographieData] = useState([]);

  useEffect(() => {
    // Fetch the bibliographie data here
    axios
      .get("http://localhost:8081/fetchBiblioEtudiant") // Replace with your API endpoint
      .then((response) => {
        // Get the last item in the response
        const lastItem = response.data[response.data.length - 1];
        
        if (lastItem) {
          const scoreMatch = lastItem.score.match(/\d{3}/); // Extract the first three digits
          const score = scoreMatch ? scoreMatch[0] : ""; // Use the first three digits or an empty string if not found
          setBibliographieData([{ ...lastItem, score }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching bibliographie data:", error);
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
      <Card style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
        <CardContent>
          {/* Insert the Navbar component here */}
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Divider style={{ marginBottom: "15px" }} />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Bibliographie
          </Typography>
          {/* Display the last item of the bibliographie data here */
          bibliographieData.map((entry, index) => (
            <div key={index}>
              <Typography variant="body1" gutterBottom>
                {`Bibliographie #${index + 2}:`}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Score
              </Typography>
              <Typography variant="body1" gutterBottom>
                {`Score: ${entry.score}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                HistoriqueQuiz
              </Typography>
              <Typography variant="body1" gutterBottom>
                {`HistoriqueQuiz: ${entry.historiqueQuiz}`}
              </Typography>
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

export default ProfileBody1;
