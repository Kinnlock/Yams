import { useGetPastriesQuery, useGetWinQuery } from './storage/game';

function App() {
  const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetPastriesQuery();

  if (pastriesIsLoading) {
    return <div>Chargement...</div>;
  }

  if (pastriesError) {
    return <div>Erreur lors du chargement: {pastriesError.message}</div>;
  }
result();

  if (pastries) {
    return (
      <>
        <Prize />
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
    console.log(nombreATester);
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


//A mettre dans un fichier component jsx à part /!\
function Prize(quantity) {
  const { data: wins, error: winError, isLoading: winIsLoading } = useGetWinQuery(quantity);

  if (winIsLoading) {
    return <div>Chargement...</div>;
  }

  if (winError) {
    return <div>Erreur lors du chargement: {winError.message}</div>;
  }

  if(wins){
    return (
      <>
        {wins.map((win) => (
          <>
            <h1>Bravo vous avez gagné un(e)</h1>
            <p key={win.id}>{win.name}</p>
          </>
        ))}
     </>
    )
  }
}

export default App;