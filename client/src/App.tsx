import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";
import VideoConferencing from "./components/videoConferencing/VideoConferencing";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";

export default function App() {
    return (
      <>
        
        <Routes>
            <Route path="/" element={<Navigate to="/signIn" />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/whatsAppWeb" element={<Dashboard />} >
              <Route index element={<LandingPage/>}/>
            </Route>
            <Route path="/videoCall" element={<VideoConferencing/>} />
        </Routes>
      </>
    );
}
