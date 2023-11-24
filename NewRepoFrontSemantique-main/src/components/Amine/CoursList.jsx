import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  CircularProgress,
  Modal,
  Button
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import background from "../../assets/bgBrain.png";
import { Container } from "@mui/system";
import ModalComponent from "./ModalComponent";


const API_endpoint = "http://localhost:8081/";

const CoursList = () => {
  
    const [allData, setAllData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [dataPassedToModal, setDataPassedToModal] = useState(null);


    const fetchAllData = async () => {
        await axios.get(API_endpoint + "getAllCoursesAndProfAndNiveauAndMatiere")
                    .then(
                        (res) => setAllData(res.data)
                    ).catch(
                        (error) => console.log(error)
                    )
    }
    const handleClickDetails = (data) => {
        setOpenModal(true);
        setDataPassedToModal(data);
    }


    useEffect(() => {
        fetchAllData();
    }, [])
    
    console.log(dataPassedToModal);



    
    if(!allData){
        return (
            <Container
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                }}
            >
                <CircularProgress />
            </Container>
    );
    }
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
            {allData.map((itemData, indexData) => (
                <Card style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)", margin: "10px" }} key={indexData}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            <Button variant="text" onClick={() => handleClickDetails(itemData)}>
                                {itemData.courseTitle}
                            </Button>
                    </Typography>
                    <Divider style={{ marginBottom: "15px" }} />
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        inclu dans la matiere : <strong>{itemData.matiereName} ({itemData.matiereType})</strong>
                    </Typography>
                    
                        <div>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Le Niveau de ce cours : <strong>{itemData.niveauTitle}</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Realise par le prof : <strong>{itemData.professeurName}</strong>
                            </Typography>
                        </div>
                    
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
            ))}
            
{dataPassedToModal ? (
<ModalComponent
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
>
    <Modal.Header>
        Course <strong>{dataPassedToModal.courseTitle}</strong> Details
    </Modal.Header>

    <Modal.Body>
        included in : <strong>{dataPassedToModal.matiereName} - {dataPassedToModal.matiereType}</strong>
        <br/>
        Level Of this Course : <strong>{dataPassedToModal.niveauTitle}</strong>
        <br/>
        Created By Professor : <strong>{dataPassedToModal.professeurName}</strong>
        <br/>
        <strong>Description : </strong>
        <br/>
        {dataPassedToModal.courseDesc}
    </Modal.Body>

    <Modal.Footer>
            
        <Modal.DismissButton className="btn-danger">Close</Modal.DismissButton>

    </Modal.Footer>

</ModalComponent>
): (<></>)}
            
        </div>
  );
};

export default CoursList;
