<<<<<<< HEAD
import "./PastriesManagementPage.css"
import { useGetAdminPastriesQuery } from "../storage/game"
const PastriesManagementPage = () => {
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';
>>>>>>> 085ce97215107be974843cb53040e11706f7d6e3

const PastriesManagementPage = () => {
    const [pastries, setPastries] = useState([]);
    const [error, setError] = useState(null);
    const [displayAdd, setDisplayAdd] = useState(false);

<<<<<<< HEAD
    if(pastriesError){
        return(
            <>
                <p>{pastriesError}</p>
            </>
        )
    }
    if(pastriesIsLoading){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }
    if(pastries){
        return(
            <>
=======
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
                setPastries(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    if(displayAdd===false)
    return (
        <div className="PastriesManagementPage">
            <h1>Pastries Management</h1>
            <button className='ajout-btn' onClick={() => setDisplayAdd(!displayAdd)}>Ajouter une patisserie</button>
            {error && <p className="error">An error occurred: {error.message}</p>}
>>>>>>> 085ce97215107be974843cb53040e11706f7d6e3
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Quantité gagné</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
<<<<<<< HEAD
                        {pastries.map((pastrie)=>(
                            <>
                                <tr key={pastrie.id}>
                                    <td>{pastrie.name}</td>
                                </tr>
                            </>
                        )
                        )}
=======
                {pastries.map(pastrie => (
                    <>
                    <tr key={pastrie.id}>
                        <td>{pastrie.name}</td>
                        <td>{pastrie.quantity}</td>
                        <td>{pastrie.quantityWon}</td>
                        <button>Modifier</button> 
                        {/*Jade je te laisse mettre ton beau bouton*/}
                    </tr>
                    </>
                ))}
>>>>>>> 085ce97215107be974843cb53040e11706f7d6e3
                    </tbody>
                </table>
        </div>
    );
    if(displayAdd===true){
        return (
            <div className='add-pastries'>
                <div className='inputs'>
                    <button className='ajout-btn' onClick={() => setDisplayAdd(!displayAdd)}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 >Ajouter une patisserie</h1>
                    <div className='input'>
                        <label htmlFor='name'>Nom</label>
                        <input id='name' type='text' required></input>
                    </div>
                    <div className='input'>
                       <label htmlFor='quantity'>Quantité</label>
                       <input id='quantity' type='number' required></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input id='image' type='text'></input>
                    </div>
                    <button>Envoyer</button>
                </div>
            </div>
        )
    }
};

export default PastriesManagementPage;