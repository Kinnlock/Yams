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
    return <h1 className="title">Plus de patisserie disponnible</h1>
  }
}

export default Prize;