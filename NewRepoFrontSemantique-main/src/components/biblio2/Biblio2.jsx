import Navbar from "./Navbar1";
import ProfileBody from "./ProfileBody1";
import PlatformSettings from "./PlatformSettings1";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Courses from "./courses1";
const Biblio2 = () => (
  <div>
    <Navbar />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBody />
      </Box>
      <Box mt={3}>
        <PlatformSettings />
      </Box>
    </Card>
    <Courses />
  </div>
);

export default Biblio2;
