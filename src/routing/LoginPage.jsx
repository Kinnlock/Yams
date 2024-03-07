import "../css/LoginPage.css";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

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
        window.location.href = '/game'
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

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
    </div>
  );
};

export default LoginPage;