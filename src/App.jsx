import './App.css';
import Game from './components/game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './routing/PastriesManagementPage.css';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [displayDeco, setDisplayDeco] = useState(false);

  return (
    <>
      <Router>
      {displayDeco && (
        <button className='btn deco-btn' onClick={async () => {
          try {
            await axios.get('http://localhost:3001/logout', { withCredentials: true });
            setDisplayDeco(false);
            alert('Vous êtes déconnecté');
          } catch (error) {
            alert('Vous devez vous connecter avant de vous déconnecter');
          }
        }}>
          Se déconnecter
        </button>
      )}
        <Routes>
         <Route path="/game" element={<Game></Game>}></Route>
         <Route path="/" element={<LoginPage></LoginPage>}></Route>
         <Route path="/management" element={<PastriesManagementPage></PastriesManagementPage>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;