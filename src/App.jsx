import './App.css';
import Game from './components/game';
import LoginPage from './routing/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
         <Route path="/login" element={<LoginPage></LoginPage>}></Route>
         <Route path="/game" element={<Game></Game>}></Route>
        </Routes>

      </Router>
    </>
  )
}

export default App;