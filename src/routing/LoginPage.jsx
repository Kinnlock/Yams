//installation des dépendances
import "../css/LoginPage.css";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import ErrorPage from "../components/ErrorPage";

const LoginPage = ({ setDisplayDeco }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  //utilisation du hook useEffect pour effectuer une requête GET vers l'API au chargement initial de la page afin de vérifier si l'utilisateur est déjà connecté ou non.
  useEffect(() => {
    axios.get('http://localhost:3001/me', {
      withCredentials: true // Inclut les cookies dans la requête
    })
    .then(response => {
      setIsConnected(true);
    })
    .catch(error => {
      setIsConnected(false);
    });
  }, []); // Le tableau vide est nécessaire afin de préciser que ce code ne doit s'exécuter qu'une seule fois lors du chargement initial du composant

  //Fonction pour permettre la modifiction de l'input email
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  //Fonction pour permettre la modifiction de l'input mdp
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // Définit une fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    //requête POST vers l'API pour tester la connexion avec les identitfiants fournis
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { email: email, password: password },
        { withCredentials: true }
      );

      //Affichage de messages d'erreur ou de succès en fonction du résultat de la requête.
      if (response.statusText === "OK") {
        setDisplayDeco(true);
        Swal.fire({
          title: "Connexion réussie",
          icon: "success",
          iconColor: "#042326",
          background: "#1B5959",
          customClass: {
              title: 'swal-title',
            },
          confirmButtonColor: '#052E33',
          width: "350px"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/game' //Redirection de l'utilisateur vers la page du jeu une fois qu'il a validé la popup
          }
      });
    }} catch (error) { // gestion des erreurs s'il y a un problème lors de la connexion
      setError("La connexion a échoué");
      Swal.fire({
        title: "Erreur",
        text: error,
        background: "#1B5959",
        color:"antiquewhite",
        icon: 'error',
        width: "400px",
        confirmButtonColor: '#052E33',
      })
    };
  }

  if(!isConnected){ // Vérifie si l'utilisateur n'est pas déjà connecté
    return (
      <div className="login-page">
  
        <h1 className="title">Gagnez des pâtisseries !</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label className="input-label" htmlFor="email">Email</label>
            <input className="input"
              id="email"
              type="email"
              onChange={handleChangeEmail}></input>
          </div>
  
          <div className="input-container">
            <label className="input-label" htmlFor="password">Mot de passe</label>
            <input className="input"
              id="password"
              type="password"
              onChange={handleChangePassword}></input>
          </div>
  
          {error && <p className="error">{error}</p>}
          <div className="connect">
            <Button
              label="Se connecter"
              type="submit"
              width="120px"
              height="40px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="1em"
              margin="25px"
            />
            <p>Ou</p>
            <Link to="/game">
              <Button
                  label="Continuer sans se connecter"
                  type="submit"
                  width="140px"
                  height="50px"
                  color="antiquewhite"
                  backgroundColor="#052E33"
                  borderRadius="15px"
                  fontSize="1em"
                  margin="25px"
                />
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
      return <ErrorPage message={"Vous êtes déjà connecté"}></ErrorPage>;
  }
}

export default LoginPage;