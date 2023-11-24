import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Quizpage from "./components/Anas/QuizPage";
import LoginPage from "./components/logix.jsx"; // assuming you have this component
import RegisterPage from "./components/register.jsx";
import QuizSubmissionsComponent from "./components/QuizSubmissionsComponent.jsx";
// import Profiles from "./components/dorrapart/profiles";
import Biblio from "./components/dorrapart/biblioetud1/biblio";
import Education from "./components/Education/MainEducation";
import AddClaim from "./components/Claims/addClaim"; // Import the AddClaim component
import AdminClaim from "./components/Claims/adminClaim"; // Import the AddClaim component
import ClaimDetails from "./components/Claims/claimDetails"; // Import the ClaimDetailsPage component
import UserClaim from "./components/Claims/userClaim";
import DashboardComponent from "./components/DashboardComponent";
import Cours from "./components/Cours/Cours";
import AddCour from "./components/Cours/AddCour";
import DetailCour from "./components/Cours/DetailCour";
import Profiles1 from "./components/biblio2/profiles1";
import ProfileProf1 from "./components/biblioprof1/profileprof1";
import ProfileProf2 from "./components/biblioprof2/profileprof2";
import Profilelist from "./components/listofbiblio/profileslist";
import Recompense from "../src/components/Anas/Recompense";
import MainComponentAmine from "./components/Amine/MainComponent";
import ListEvent from "./components/linaa/ListEvent";
import ListProg from "./components/linaa/Programme";
import DetailProg from "./components/linaa/detailProg";
import DetailEvent from "./components/linaa/detailEvent";
import UsersList from "./components/Taha/UserList";
import AdminPerformance from "./components/Performance/adminPerformance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz" element={<Quizpage />} />
        <Route path="/subs" element={<QuizSubmissionsComponent />} />
        {/* <Route path="/profile" element={<Profiles />} /> */}
        <Route path="/education" element={<Education />} />
        <Route path="/biblio1" element={<Biblio />} />
        <Route path="/biblio2" element={<Profiles1 />} />
        <Route path="/biblioprof1" element={<ProfileProf1 />} />
        <Route path="/biblioprof2" element={<ProfileProf2 />} />
        <Route path="/listbiblio" element={<Profilelist />} />
        <Route path="/Recompense" element={<Recompense />} />

        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/AddCour" element={<AddCour />} />
        <Route path="/DetailCour/:id" element={<DetailCour />} />

        <Route path="/addclaim" element={<AddClaim />} />
        <Route path="/adminclaims" element={<AdminClaim />} />
        <Route path="/claim/details/:claimId" element={<ClaimDetails />} />
        <Route path="/claims" element={<UserClaim />} />

        {/* Routing Semantic Web - Amine */}
        <Route path="/coursSemantic" element={<MainComponentAmine />} />

        <Route path="/listEvent" element={<ListEvent />} />
        <Route path="/listProg" element={<ListProg />} />
        <Route path="/detailProg/:name" element={<DetailProg />} />
        <Route path="/detailEvent/:name" element={<DetailEvent />} />
        <Route path="/adminperformance" element={<AdminPerformance />} />

        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
