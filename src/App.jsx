import './App.css';
import Game from './components/game';
<<<<<<< HEAD
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';
=======
>>>>>>> 085ce97215107be974843cb53040e11706f7d6e3
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
<<<<<<< HEAD
         <Route path="/login" element={<LoginPage />}></Route>
         <Route path="/game" element={<Game />}></Route>
         <Route path="/management" element={<PastriesManagementPage />}></Route>
=======
         <Route path="/game" element={<Game></Game>}></Route>
         <Route path="/" element={<LoginPage></LoginPage>}></Route>
         <Route path="/management" element={<PastriesManagementPage></PastriesManagementPage>}></Route>
>>>>>>> 085ce97215107be974843cb53040e11706f7d6e3
        </Routes>
      </Router>
    </>
  )
}

export default App;