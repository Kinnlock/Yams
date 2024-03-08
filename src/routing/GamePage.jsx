import { useState } from 'react';
import Prize from '../components/Prize';
import { useGetPastriesQuery } from '../storage/game';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const GamePage = ({ setDisplayDeco }) => {

  // État pour vérifier si l'utilisateur est connecté
  const [isConnected, setIsConnected] = useState(false);

  // État pour compter le nombre de lancers de dés
  const [rollCount, setRollCount] = useState(0);

  // Vérification de la connexion de l'utilisateur
  axios.get('http://localhost:3001/me', {
    withCredentials: true
  })
    .then(response => {
      // Si l'utilisateur est connecté, met à jour l'état isConnected
      setIsConnected(true)
      setDisplayDeco(true);
    })
    .catch(error => {
      // Si l'utilisateur n'est pas connecté, met à jour l'état isConnected
      setDisplayDeco(false);
    });

  // Utilisation du hook de requête pour récupérer les données des pâtisseries
  const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetPastriesQuery();

  // État pour stocker le résultat des lancers de dés
  const [resultat, setResultat] = useState([]);

  // Si les pâtisseries sont en cours de chargement, affiche un message de chargement
  if (pastriesIsLoading) {
    return <div>Chargement...</div>;
  }

  // Si une erreur survient lors du chargement des pâtisseries, affiche un message d'erreur
  if (pastriesError) {
    return <div>Erreur lors du chargement: {pastriesError.message}</div>;
  }

  // Si les pâtisseries sont chargées, affiche le contenu de la page de jeu
  if (pastries) {
    // Fonction appelée lorsqu'un utilisateur clique sur le bouton pour lancer les dés
    const handleClick = () => {
      if (rollCount < 3) {
        // Génère un nouveau résultat et met à jour les états en conséquence
        const newResultat = result();
        setResultat(newResultat);
        setRollCount(rollCount + 1);
      } else {
        // Affiche une alerte si l'utilisateur a déjà lancé les dés 3 fois
        Swal.fire({
          title: "Vous avez déjà lancé les dés 3 fois",
          background: "#1B5959",
          color: "antiquewhite",
          icon: 'error',
          width: "350px",
          confirmButtonColor: '#052E33',
        })
      }
    };

    // Rendu de la page de jeu
    return (
      <>
        {/* Bouton pour gérer les pâtisseries, affiché uniquement si l'utilisateur est connecté */}
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

        {/* Bouton de connexion, affiché uniquement si l'utilisateur n'est pas connecté */}
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

        {/* Contenu principal de la page de jeu */}
        <div className='container'>
          {/* Bouton pour lancer les dés */}
          {(resultat[5] < 1 || resultat.length < 1) && (
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

          {/* Conteneur pour afficher les résultats des dés */}
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

        {/* Affiche le prix si le résultat le permet */}
        {resultat[5] > 0 &&
          <>
            <Prize quantity={resultat[5]} />
            {/* Bouton pour réclamer le prix (affiche actuellement une alerte) */}
            <Button
              label="Réclamer"
              width="130px"
              height="50px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="0.9em"
              margin="25px"
              onClick={() =>
                Swal.fire({
                  title: "Logique à venir",
                  text: "imaginons un lien vers un bon d'achat ou quelque chose",
                  background: "#1B5959",
                  color: "antiquewhite",
                  iconColor: "#042326",
                  confirmButtonColor: '#052E33',
                  width: "400px"
                })
              }
            />
          </>
        }
      </>
    );
  }

  // Fonction pour générer un résultat aléatoire lors du lancer de dés
  function result() {
    let resultats = [];
    let gagner = 0;

    // Lance 5 dés et stocke les résultats dans un tableau
    for (let i = 0; i < 5; i++) {
      resultats.push(de());
    }

    // Compte le nombre de chaque résultat
    let counts = {};
    resultats.forEach(nombre => {
      counts[nombre] = (counts[nombre] || 0) + 1;
    });

    // Calcule les gains en fonction des résultats
    Object.values(counts).forEach(count => {
      if (count === 3) {
        gagner += 1;
      } else if (count === 4) {
        gagner += 2;
      }
    });

    // Ajoute les gains au tableau des résultats
    resultats.push(gagner);
    return resultats;
  }

  // Fonction pour simuler le lancer d'un dé (renvoie un nombre aléatoire entre 1 et 6)
  function de() {
    return Math.floor(Math.random() * (6 - 1) + 1);
  }
}

export default GamePage;
