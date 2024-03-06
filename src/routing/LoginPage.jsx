import "./LoginPage.css";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { email: email, password: password },
        { withCredentials: true }
      );
      console.log(response);
      // Ici, vous pouvez gérer la réponse de votre serveur
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login Page</h1>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handleChangeEmail}></input>

      <label htmlFor="password">Mot de passe</label>
      <input id="password" type="password" onChange={handleChangePassword}></input>

      {error && <p className="error">{error}</p>}

      <Button 
        label="Se connecter"
        onClick={handleLogin}
        width="120px"
        height="40px"
        color="antiquewhite"
        backgroundColor="#052E33"
        borderRadius="15px"
        fontSize="1em"
        margin="25px"
      />
    </div>
  );
};

export default LoginPage;