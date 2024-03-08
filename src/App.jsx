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
            Swal.fire({
              title: "Voulez-vous vraiment vous déconnecter ?",
              icon: "warning",
              background: "#1B5959",
              color: "antiquewhite",
              showCancelButton: true,
              confirmButtonColor: "#052E33",
              cancelButtonColor: "#A3241A",
              confirmButtonText: "Oui",
              width: "400px"
            }).then((result) => {
              if (result.isConfirmed) {
                axios.get('http://localhost:3001/logout', { withCredentials: true });
                Swal.fire({
                  title: "Vous êtes déconnecté",
                  icon: "success",
                  iconColor: "#042326",
                  background: "#1B5959",
                  color: "antiquewhite",
                  width: "250px",
                  confirmButtonColor: '#052E33',
                }).then((result)=>{
                  if(result.isConfirmed){
                    window.location.href = '/'
                    setDisplayDeco(false);
                  }
                  else{
                    window.location.href = '/'
                    setDisplayDeco(false);
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
         <Route path="/game" element={<GamePage setDisplayDeco={setDisplayDeco}></GamePage>}></Route>
         <Route path="/" element={<LoginPage setDisplayDeco={setDisplayDeco}></LoginPage>}></Route>
         <Route path="/management" element={<PastriesManagementPage setDisplayDeco={setDisplayDeco}></PastriesManagementPage>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;