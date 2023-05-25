import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";

export default function App() {
    return (
      <>
        
        <Routes>
            <Route path="/" element={<Navigate to="/whatsAppWeb" />} />
            <Route path="/whatsAppWeb" element={<Dashboard />} >
              <Route index element={<LandingPage/>}/>
            </Route>
        </Routes>
      </>
    );
}
