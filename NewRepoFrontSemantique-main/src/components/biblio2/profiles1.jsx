import Navbar1 from "./Navbar1";
import ProfileBody1 from "./ProfileBody1";
import PlatformSettings1 from "./PlatformSettings1";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Courses1 from "./courses1";
const ProfilePage1 = () => (
  <div>
    <Navbar1 />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBody1 />
      </Box>
      <Box mt={3}>
        <PlatformSettings1 />
      </Box>
    </Card>
    <Courses1 />
  </div>
);

export default ProfilePage1;
