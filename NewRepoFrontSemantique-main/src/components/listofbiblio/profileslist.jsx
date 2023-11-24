import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Courseslist from "./courseslist";
import ProfileBodylist from "./ProfileBodylist";
import Navbarlist from "./Navbarlist";
const Profilelist = () => (
  <div>
    <Navbarlist />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBodylist />
      </Box>
      <Box mt={3}>
      </Box>
    </Card>
    <Courseslist />
  </div>
);

export default Profilelist;
