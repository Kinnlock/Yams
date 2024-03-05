import "./LoginPage.css"
import {useState} from "react"

const LoginPage = () => {
    const [state,setState] = useState("")
    return (
        <div className="LoginPage">
            <h1>Login Page</h1>
            <label for="email">Email</label>
            <input id="email" type="email" ></input>
            <label for="password">Mot de passe</label>
            <input id="password" type="password" ></input>
        </div>
    )
}



export default LoginPage