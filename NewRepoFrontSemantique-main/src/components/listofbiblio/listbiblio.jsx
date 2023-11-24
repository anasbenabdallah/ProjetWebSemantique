import Navbar from "./Navbarlist";
import ProfileBody from "./ProfileBodylist";
import PlatformSettings from "./PlatformSettingslist";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Courses from "./courseslist";
const Bibliolist = () => (
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

export default Bibliolist;
