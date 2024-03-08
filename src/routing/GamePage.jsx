import { useState } from 'react';
import Prize from '../components/Prize';
import { useGetPastriesQuery } from '../storage/game';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const GamePage = ({setDisplayDeco}) => {

  const [isConnected, setIsConnected] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  axios.get('http://localhost:3001/me', {
    withCredentials: true
  })
  .then(response => {
    setIsConnected(true)
    setDisplayDeco(true);
  })
  .catch(error => {
    setDisplayDeco(false);
  });


const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetPastriesQuery();
  const [resultat, setResultat] = useState([]); 

  if (pastriesIsLoading) {
    return <div>Chargement...</div>;
  }

  if (pastriesError) {
    return <div>Erreur lors du chargement: {pastriesError.message}</div>;
  }


    if (pastries) {
      const handleClick = () => {
        if (rollCount < 3) {
          const newResultat = result();
          setResultat(newResultat);
          setRollCount(rollCount + 1);
        } else {
          Swal.fire({
            title: "Vous avez déjà lancé les dés 3 fois",
            background: "#1B5959",
            color:"antiquewhite",
            icon: 'error',
            width: "350px",
            confirmButtonColor: '#052E33',
            confirmButtonTextColor: 'antiquewhite',
          })
        }
      };
  

    return (
      <>
      {isConnected && (        
        <div className="management-button">
          <Link to="/management">
            <Button 
              label="Gérer les pâtisseries"
              width="130px"
              height="50px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="0.9em"
              margin="25px"
            />
          </Link>
        </div>)}
        {!isConnected && (        
        <div className="management-button">
          <Link to="/">
            <Button 
              label="Se connecter"
              width="130px"
              height="50px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="0.9em"
              margin="25px"
            />
          </Link>
        </div>)}


        <div className='container'>
          

          {(resultat[5] < 1 || resultat.length<1) && (
            <Button 
              label="Lancer les dés"
              onClick={() => handleClick()}
              width="150px"
              height="40px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="1em"
              margin="25px"
            />
          )}
          <div className='dices-container'>
            <div className='dices'>
            {resultat[0]}
            </div>
            <div className='dices'>
            {resultat[1]}
            </div>
            <div className='dices'>
            {resultat[2]}
            </div>
            <div className='dices'>
            {resultat[3]}
            </div>
            <div className='dices'>
            {resultat[4]}
            </div>
          </div>
        </div>
        
        {resultat[5] > 0 && 
        <>
          <Prize quantity={resultat[5]} /> 
          <Button 
              label="Réclamer"
              width="130px"
              height="50px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="0.9em"
              margin="25px"
              onClick={()=>
                Swal.fire({
                  title: "Logique à venir",
                  text: "imaginons un lien vers un bon d'achat ou quelque chose",
                  background: "#1B5959",
                  color:"antiquewhite",
                  iconColor: "#042326",
                  icon: 'succes',
                  confirmButtonColor: '#052E33',
                  confirmButtonTextColor: 'antiquewhite',
                  width: "400px"
                })
              }
            />       
        </>
        } 

      </>
    );
  }

function result() {
  let resultats = [];
  let gagner = 0;
  
  for (let i = 0; i < 5; i++) {
    resultats.push(de());
  }
  
  let counts = {}; 

  resultats.forEach(nombre => {
    counts[nombre] = (counts[nombre] || 0) + 1;
  });


  Object.values(counts).forEach(count => {
    if (count === 3) {
      gagner += 1; 
    } else if (count === 4) {
      gagner += 2; 
    }
  });

  resultats.push(gagner);
  return resultats;
}

//Le dé qui donne un resultat entre 1 et 6
function de(){
  return Math.floor(Math.random() * (6-1) + 1);
}
}
export default GamePage