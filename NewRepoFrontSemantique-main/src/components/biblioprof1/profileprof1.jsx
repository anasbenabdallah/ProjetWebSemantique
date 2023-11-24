import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Navbarprof1 from "./Navbarprof1";
import ProfileBodyprof1 from "./ProfileBodyprof1";
import PlatformSettingsprof1 from "./PlatformSettingsprof1";
import Coursesprof1 from "./coursesprof1";
const ProfileProf1 = () => (
  <div>
    <Navbarprof1 />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBodyprof1 />
      </Box>
      <Box mt={3}>
        <PlatformSettingsprof1 />
      </Box>
    </Card>
    <Coursesprof1 />
  </div>
);

export default ProfileProf1;
