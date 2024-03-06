import './App.css';
import Game from './components/game';
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
         <Route path="/" element={<LoginPage />}></Route>
         <Route path="/game" element={<Game />}></Route>
         <Route path="/management" element={<PastriesManagementPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;