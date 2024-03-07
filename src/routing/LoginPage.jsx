import "../css/LoginPage.css";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const LoginPage = ({ setDisplayDeco }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { email: email, password: password },
        { withCredentials: true }
      );

      if (response.statusText === "OK") {
        console.log(response);
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
          confirmButtonTextColor: 'antiquewhite',
          width: "350px"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/game'
          }
      });
    }} catch (error) {
      setError("La connexion a échoué");
      Swal.fire({
        title: "Erreur",
        text: error,
        background: "#1B5959",
        color:"antiquewhite",
        icon: 'error',
        width: "400px"
      })
    };
  }

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
      </form>
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
  );
}
export default LoginPage;