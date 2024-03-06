import "./LoginPage.css"
import {useState} from "react"
import Button from "../components/Button";
import { usePostLoginQuery } from "../storage/game";
import React from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state,setState] = useState("")

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
      };
    
      const handleChangePassword = (e) => {
        setPassword(e.target.value);
      };
    
      const handleLogin = () => {
        setState({ email: email, password: password });
        const { data, loading, error } = usePostLoginQuery(state);
        console.log(data) ;
      };

    //   const login  = (email,password) => {
    //     setState({ email: email, password: password });
    //     const { data, loading, error } = usePostLoginQuery(state);
    //   };



    return (
        <div className="LoginPage">
            <h1>Login Page</h1>
            <label for="email" onChange={handleChangeEmail}>Email</label>
            <input id="email" type="email" ></input>

            <label for="password" onChange={handleChangePassword}>Mot de passe</label>
            <input id="password" type="password" ></input>

            <Button onClick={handleLogin} label="Se connecter" />
        </div>
    )
}

export default LoginPage