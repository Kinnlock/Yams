import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';
import Button from '../components/Button';

const PastriesManagementPage = () => {
    const [pastries, setPastries] = useState([]);
    const [error, setError] = useState(null);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [currentPastry, setCurrentPastry] = useState(undefined);

    const handleModifications = (pastry) => {
        setCurrentPastry(pastry);
        setDisplayAdd(!displayAdd); 
    }

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
            <h1 className="title">Pastries Management</h1>
            <button className='ajout-btn' onClick={() => setDisplayAdd(!displayAdd)}>Ajouter une patisserie</button>
            {error && <p className="error">An error occurred: {error.message}</p>}
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
                {pastries.map(pastrie => (
                    <>
                    <tr key={pastrie.id}>
                        <td>{pastrie.name}</td>
                        <td>{pastrie.quantity}</td>
                        <td>{pastrie.quantityWon}</td>
                        <td><Button onClick={() => handleModifications(pastrie)}
                                label="Modifier"
                                width="180px"
                                height="40px"
                                color="antiquewhite"
                                backgroundColor="#052E33"
                                borderRadius="15px"
                                fontSize="1em"
                                margin="25px"
            /> </td>
                        {/*Jade je te laisse mettre ton beau bouton*/}
                    </tr>
                    </>
                ))}
                    </tbody>
                </table>
        </div>
    );
    else if(displayAdd===true && currentPastry==undefined){
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
    else if(displayAdd===true && currentPastry){
        return (
            <div className='add-pastries'>
                <div className='inputs'>
                    <button className='ajout-btn' onClick={() => {setDisplayAdd(!displayAdd); setCurrentPastry(undefined)}}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 >Ajouter une patisserie</h1>
                    <div className='input'>
                        <label htmlFor='name'></label>
                        <input id='name' type='text' value={currentPastry.name} required></input>
                    </div>
                    <div className='input'>
                       <label htmlFor='quantity'>Quantité</label>
                       <input id='quantity' type='number' value={currentPastry.quantity} required></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input id='image' type='text' value={currentPastry.image}></input>
                    </div>
                    <button>Envoyer</button>
                </div>
            </div>
        )
    }
};

export default PastriesManagementPage;