import './css/App.css';
import GamePage from './routing/GamePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routing/LoginPage';
import PastriesManagementPage from './routing/PastriesManagementPage';
import './css/PastriesManagementPage.css';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'

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
            Swal.fire({
              title: "Voulez-vous vraiment vous déconnecter",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Oui"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Vous êtes déconnecté",
                  icon: "success"
                }).then((result)=>{
                  if(result.isConfirmed){
                    window.location.href = '/'
                  }
                })
              }
            });
          } catch (error) {
            alert(error);
          }
        }}>
          Se déconnecter
        </button>
      )}
        <Routes>
         <Route path="/game" element={<GamePage></GamePage>}></Route>
         <Route path="/" element={<LoginPage setDisplayDeco={setDisplayDeco}></LoginPage>}></Route>
         <Route path="/management" element={<PastriesManagementPage setDisplayDeco={setDisplayDeco}></PastriesManagementPage>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;