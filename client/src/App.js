import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
