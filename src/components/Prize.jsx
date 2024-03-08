import { useGetWinQuery } from "../storage/game.jsx";
import React from "react";
import "../css/Prize.css";

function Prize({ quantity }) {
  const { data: wins, error: winError, isLoading: winIsLoading } = useGetWinQuery(quantity);

  if (winIsLoading) {
    return <div>Loading win...</div>;
  }

  if (winError) {
    return <div>Error loading win: {winError.message}</div>;
  }

  if (wins.length > 0) {
    return (
      <>
        <h1 className="title">Bravo, vous avez gagné un(e) :</h1>
        {[...wins].map((win) => (
          <div key={win.id}>
            <p className="pastries-name">{win.name}</p>
            {win.image !== "http://placehold.it/32x32" && (
              <img className="table-image" src={"http://localhost:3001/uploads/images/" + win.image} alt={win.name} />
            )}
            {win.image === "http://placehold.it/32x32" && (
              <img className="table-image" src={win.image} alt={win.name} />
            )}
          </div>
        ))}
      </>
    );
  } else {
    return <h1 className="title">Plus de pâtisseries disponibles</h1>;
  }
}

export default Prize;