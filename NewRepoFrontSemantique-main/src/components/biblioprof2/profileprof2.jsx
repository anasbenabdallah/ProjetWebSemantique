import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Navbarprof2 from "./Navbarprof2";
import ProfileBodyprof2 from "./ProfileBodyprof2";
import PlatformSettingsprof2 from "./PlatformSettingsprof2";
import Coursesprof2 from "./coursesprof2";
const ProfileProf2 = () => (
  <div>
    <Navbarprof2 />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBodyprof2 />
      </Box>
      <Box mt={3}>
        <PlatformSettingsprof2 />
      </Box>
    </Card>
    <Coursesprof2 />
  </div>
);

export default ProfileProf2;
