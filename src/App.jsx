import './App.css';
import Game from './components/game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
         <Route path="/game" element={<Game/>}></Route>
        </Routes>

      </Router>
    </>
  )
}

export default App;