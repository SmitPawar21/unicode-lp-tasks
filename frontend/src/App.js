import './App.css';
import './App2.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing.jsx';
import {SignupPage} from "./pages/sign_up.jsx";
import {SigninPage} from "./pages/sign_in.jsx";
import { Protected } from './pages/protected.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
