import './App.css';
import './App2.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing.jsx';
import { SignupPage } from "./pages/sign_up.jsx";
import { SigninPage } from "./pages/sign_in.jsx";
import { Protected } from './pages/protected.jsx';
import { AuthProvider } from './components/AuthContext.js';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/protected" element={<Protected />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
