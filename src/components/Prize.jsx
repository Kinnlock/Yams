import { useGetWinQuery } from "../storage/game.jsx";
import React from "react";
import "./Prize.css";

function Prize({ quantity }) {
  const { data: wins, error: winError, isLoading: winIsLoading } = useGetWinQuery(quantity);

  if (winIsLoading) {
    return <div>Loading win...</div>;
  }

  if (winError) {
    return <div>Error loading win: {winError.message}</div>;
  }
  if (wins.length>0) {
    return (
      <>
        <h1 className="title">Bravo, vous avez gagné un(e) :</h1>
        {[...wins].map((win) => (
          <p key={win.id} className="pastries-name">{win.name}</p>
        ))}
      </>
    );
  }
  else{
<<<<<<< HEAD
    return <h1 className="title">Plus de patisserie disponnible</h1>
=======
    return <h1 className="title">Plus de pâtisseries disponnibles</h1>
>>>>>>> 50c5bdf5de5ecc4e2a3e982b77cd8519d1ecd5a4
  }
}

export default Prize;