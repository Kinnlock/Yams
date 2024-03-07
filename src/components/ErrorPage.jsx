import { Link } from "react-router-dom";
import Button from "./Button";

const ErrorPage = ({message}) =>{
    return (
        <>
            <h1>{message}</h1>
            <Link to={'/game'}>
                <Button
                    label="Retour au jeu"
                    width="120px"
                    height="40px"
                    color="antiquewhite"
                    backgroundColor="#A3241A"
                    borderRadius="15px"
                    fontSize="0.9em"
                    margin="15px"
                />
            </Link>
        </>
    )
}
export default ErrorPage