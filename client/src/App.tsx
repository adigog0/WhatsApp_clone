import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";
import SignIn from "./pages/signIn/SignIn";
import VideoConferencing from "./components/videoConferencing/VideoConferencing";

export default function App() {
    return (
      <>
        
        <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/whatsAppWeb" element={<Dashboard />} >
              <Route index element={<LandingPage/>}/>
            </Route>
            <Route path="/videoCall" element={<VideoConferencing/>} />
        </Routes>
      </>
    );
}
