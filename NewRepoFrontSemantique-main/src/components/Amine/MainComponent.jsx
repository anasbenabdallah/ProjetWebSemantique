import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CoursList from "./CoursList";
import SearchCardComponent from "./SearchCard";
import NavBarComponent from "./NavBar";
const MainComponentAmine = () => (
  <div>
    <NavBarComponent />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
        <Box>
            <CoursList />
        </Box>
        <Box mt={3}>
        </Box>
    </Card>

    <SearchCardComponent />
  </div>
);

export default MainComponentAmine;
