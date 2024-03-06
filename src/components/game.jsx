import { useState } from 'react';
import Prize from '../components/Prize';
import { useGetPastriesQuery } from '../storage/game';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import "./game.css"

const Game = () => {

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
      const newResultat = result(); 
      setResultat(newResultat); 
    };

    return (
      <>
        <div className="management-button">
            <Link to="/management">
            <Button 
              label="Gérer les pâtisseries"
              width="130px"
              height="30px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="0.9em"
              margin="25px"
            />
            </Link>
          </div>

        <div className='container'>
          

          {(resultat[5] < 1 || resultat.length<1) && (
            <Button 
              label="Lancer le dé"
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
        
        {resultat[5] > 0 && <Prize quantity={resultat[5]} />} 
      </>
    );
  }
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
  console.log(counts)


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
export default Game