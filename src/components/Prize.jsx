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
  console.log(wins)
  if (wins) {
    return (
      <>
        <h1 className="title">Bravo, vous avez gagné un(e) :</h1>
        {[...wins].map((win) => (
          <p key={win.id} className="pastries-name">{win.name}</p>
        ))}
      </>
    );
  }
}

export default Prize;