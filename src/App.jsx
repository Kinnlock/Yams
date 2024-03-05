import { useState } from 'react';
import Prize from './components/Prize';
import { useGetPastriesQuery } from './storage/game';
import Button from './components/Button';
import './App.css';

function App() {
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
      <div className='container'>

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
        <Button label = "Lancer le dé"
                onClick={() => handleClick()}
                width="150px"
                height="40px"
                color="antiquewhite"
                backgroundColor="#052E33"
                borderRadius="15px"
                fontSize="1em"
        />
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
  
  let copieResultat = [...resultats];
  while (copieResultat.length > 0) {
    let nombreATester = copieResultat.shift();
    if (copieResultat.includes(nombreATester)) {
      gagner++;
    }
  }
  resultats.push(gagner);
  //Resultat est un tableau de 6. 0 à 4 correspondant au resultat du dé et 5 au nombre de patisserie gagné
  return resultats;
}

//Le dé qui donne un resultat entre 1 et 6
function de(){
  return Math.floor(Math.random() * (6-1) + 1);
}

export default App;