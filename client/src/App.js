import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext";
function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
