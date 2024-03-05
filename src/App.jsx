import Prize from './components/Prize';

function App() {
  const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetPastriesQuery();

  if (pastriesIsLoading) {
    return <div>Loading pastries...</div>;
  }

  if (pastriesError) {
    return <div>Error loading pastries: {pastriesError.message}</div>;
  }

  if (pastries) {
    return (
      <>
        <Prize />
      </>
    );
  }
}

//Faire une logique (lancer 5 fois dé et si y a des doubles ou trible alors on lance Game avec une prop 1 ou 2 qui serait le return de dé s'il y a respectivement un double ou un triple)
function result(){

}

//Le dé qui donne un resultat entre 1 et 6
function de(){
  return Math.floor(Math.random() * (6-1) + 1);
}

export default App;