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


const API_endpoint = "http://localhost:8081/";

const SearchCardComponent = () => {

    const [filteredData, setFiltredData] = useState(null);
    const [filteredDataByMatiere, setFilteredDataByMatiere] = useState(null);

    const [courseTitleSearchInput, setCourseTitleSearchInput] = useState("");
    const [niveauTitleSearchInput, setNiveauTitleSearchInput] = useState("");
    const [professeurNameSearchInput, setProfesseurNameSearchInput] = useState("");
    const [matiereSearchInput, setMatiereSearchInput] = useState("");
  
    const fetchFilteredData = async () => {
        await axios.get(API_endpoint+"customQuery", {
            params: {
                courseTitle: courseTitleSearchInput,
                professeurName: professeurNameSearchInput,
                niveauTitle: niveauTitleSearchInput
            }
        }).then(
            (res) => setFiltredData(res.data)
        ).catch(
            (error) => console.log(error)
        )
    }
    const fetchFilteredDataByMatiere = async () => {
        await axios.get(API_endpoint+"customQueryByMatiereName", {
            params: {
                matiereName: matiereSearchInput
            }
        }).then(
            (res) => setFilteredDataByMatiere(res.data)
        ).catch(
            (error) => console.log(error)
        )
    }

    const handleSearchSubmit = () => {
        fetchFilteredData();
    }
    const handleSearchMatiereSubmit = () => {
        fetchFilteredDataByMatiere();
    }

    // console.log(filteredData);
    return (
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            }}
        >
            {/* First Search By Courses and its Details */}
            <h1>Search By Courses</h1>
            <p>Glimpse of the Courses shared in our Platform</p>

            <Card style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Search Cours by its Details
                    </Typography>

                    <Divider style={{ marginBottom: "15px" }} />

                    <form>
                        <TextField
                            label="Search by Course Title"
                            variant="outlined"
                            fullWidth
                            value={courseTitleSearchInput}
                            onChange={(e) => setCourseTitleSearchInput(e.target.value)}
                        />
                        <TextField
                            label="Search by Level of Course"
                            variant="outlined"
                            fullWidth
                            value={niveauTitleSearchInput}
                            onChange={(e) => setNiveauTitleSearchInput(e.target.value)}
                        />
                        <TextField
                            label="Search by Prof Name"
                            variant="outlined"
                            fullWidth
                            value={professeurNameSearchInput}
                            onChange={(e) => setProfesseurNameSearchInput(e.target.value)}
                        />
                        <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={handleSearchSubmit}>
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {filteredData ? (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {filteredData.map((resource, index) => (
                        <Card key={index} style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
                            <CardContent>
                                {resource.courseTitle}
                                <img
                                    src={`/img/article.png`}
                                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                                />
                                <Typography variant="h5" component="div" style={{ margin: "10px 0" }}>
                                    Level : {resource.niveauTitle}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Created By :{resource.professeurName}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No resources found.</p>
            )}

            {/* This is the Search By Matiere and Its Details  */}
            <h1>Search By Matiere</h1>
            <p>Glimpse of the Matiere shared in our Platform</p>

            <Card style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Search Matiere
                    </Typography>

                    <Divider style={{ marginBottom: "15px" }} />

                    <form>
                        <TextField
                            label="Search by Matiere Name"
                            variant="outlined"
                            fullWidth
                            value={matiereSearchInput}
                            onChange={(e) => setMatiereSearchInput(e.target.value)}
                        />
                        <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={handleSearchMatiereSubmit}>
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {filteredDataByMatiere ? (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {filteredDataByMatiere.map((resource, index) => (
                        <Card key={index} style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }}>
                            <CardContent>
                                <strong>{resource.matiereName}</strong> - {resource.courseTitle}
                                <img
                                    src={`/img/article.png`}
                                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                                />
                                <Typography variant="h5" component="div" style={{ margin: "10px 0" }}>
                                    Level : {resource.niveauTitle}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Created By :{resource.professeurName}
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

export default SearchCardComponent;
