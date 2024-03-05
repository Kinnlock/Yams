import { useState } from 'react';
import Prize from './components/Prize';
import { useGetPastriesQuery } from './storage/game';

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
        <button onClick={handleClick}>Lancer le dé</button> {/* Appel de handleClick sur clic */}
        <ul>
          <li>{resultat[0]}</li>
          <li>{resultat[1]}</li>
          <li>{resultat[2]}</li>
          <li>{resultat[3]}</li>
          <li>{resultat[4]}</li>
        </ul>
        <Prize quantity={resultat[5]} />
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