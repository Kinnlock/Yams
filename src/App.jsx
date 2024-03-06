import './App.css';
import Game from './components/game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';

function App() {
  return (
    <>
      <Router>
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