import { useGetWinQuery } from "../storage/game.jsx";
import React from "react";

function Prize({ quantity }) {
  const { data: wins, error: winError, isLoading: winIsLoading } = useGetWinQuery(quantity);
  
  if (winIsLoading) {
    return <div>Loading win...</div>;
  }

  if (winError) {
    return <div>Error loading win: {winError.message}</div>;
  }

  if (wins) {
    console.log(wins);
    return (
      <>
        <h1>Bravo, vous avez gagné un(e) :</h1>
        {wins.map((win) => (
          <p key={win.id}>{win.name}</p>
        ))}
      </>
    );
  }
}

export default Prize;