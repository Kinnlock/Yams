import "./LoginPage.css"
import {useState} from "react"
import Button from "../components/Button";
import { usePostLoginQuery } from "../storage/game";
import React from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState("")

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
      };
    
      const handleChangePassword = (e) => {
        setPassword(e.target.value);
      };

      const handleLogin = () => {
        setState({ email: email, password: password });
      };

    return (
        <div className="login-page">
            <h1 className="title">Gagnez des pâtisseries !</h1>

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

            <Button 
              label="Se connecter"
              onClick={() => handleLogin()}
              width="120px"
              height="40px"
              color="antiquewhite"
              backgroundColor="#052E33"
              borderRadius="15px"
              fontSize="1em"
              margin="25px"
            />
        </div>
    )
}

export default LoginPage