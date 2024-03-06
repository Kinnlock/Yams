import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';
import Button from '../components/Button';

const PastriesManagementPage = ({setDisplayDeco}) => {
    const [pastries, setPastries] = useState([]);
    const [error, setError] = useState(null);
    const [currentPastry, setCurrentPastry] = useState(undefined);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [newPastry, setNewPastry] = useState({
        name : '',
        quantity : 1,
        image : ''
    });
    const deletePastry = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/pastry/${id}`, { withCredentials: true })
            console.log(response);
            const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
            setPastries(updatedResponse.data);
        }
        catch(error) {
            console.error('Error delete pastry:', error);
        }

    }

    const modifHandleSubmit = async () => {
        try {
            let id = currentPastry.id
            const response = await axios.put (`http://localhost:3001/api/pastry/${id}`, currentPastry, { withCredentials: true });

            console.log('Pâtisserie ajouté:', response.data);

            setNewPastry({
                name: '',
                quantity: 1,
                image: ''
            });

            const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
            setPastries(updatedResponse.data);
        }
        catch (error) {
            console.error('Error adding pastry:', error);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post ('http://localhost:3001/api/pastry', newPastry, { withCredentials: true });

            console.log('Pâtisserie ajouté:', response.data);

            setNewPastry({
                name: '',
                quantity: 1,
                image: ''
            });

            const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
            setPastries(updatedResponse.data);
        }
        catch (error) {
            console.error('Error adding pastry:', error);
        }
    };

    const handleModifications =  (pastry) => {
        setCurrentPastry(pastry);
        setDisplayAdd(!displayAdd);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
                setPastries(response.data);
                setDisplayDeco(true);
            } catch (error) {
                alert("Veuillez d'abord vous connecter")
                window.location.href = '/'
                setError(error);
            }
        };
        fetchData();
    }, []);

    if (displayAdd === false) {
        return (
            <div className="PastriesManagementPage">
                    <h1 className="title">Pastries Management</h1>
                    <button className='ajout-btn btn' onClick={() => setDisplayAdd(!displayAdd)}>Ajouter une patisserie</button>
                    {error && <p className="error">An error occurred: {error.message}</p>}

                <table>
                    <thead>
                        <tr>
                            <th className="column-name">Nom</th>
                            <th className="column-name">Quantité</th>
                            <th className="column-name">Quantité gagnée</th>
                            <th className="column-name">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastries.map(pastrie => (
                            <tr key={pastrie.id}>
                                <td>{pastrie.name}</td>
                                <td>{pastrie.quantity}</td>
                                <td>{pastrie.quantityWon}</td>
                                <td><Button onClick={() => handleModifications(pastrie)}
                                            label="Modifier"
                                            width="90px"
                                            height="30px"
                                            color="antiquewhite"
                                            backgroundColor="#052E33"
                                            borderRadius="15px"
                                            fontSize="0.9em"
                                            margin="15px"
                                    />
                                </td>
                                <td><Button onClick={() => deletePastry(pastrie.id)}
                                            label="Supprimer"
                                            width="90px"
                                            height="30px"
                                            color="antiquewhite"
                                            backgroundColor="#A3241A"
                                            borderRadius="15px"
                                            fontSize="0.9em"
                                            margin="15px"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else if (displayAdd === true && currentPastry === undefined) {
        return (
            <div className='add-pastries'>
                <div className='inputs'>
                    <button className='ajout-btn btn' onClick={() => setDisplayAdd(!displayAdd)}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 className="title">Ajouter une patisserie</h1>
                    <div className='input'>
                        <label htmlFor='pastryName'>Nom</label>
                        <input 
                            id='pastryName' 
                            type='text' 
                            defvalue={newPastry.pastryName} 
                            onChange={(e) => setNewPastry({ ...newPastry, name: e.target.value })}
                            required
                        ></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='quantity'>Quantité (plus grand que 0)</label>
                        <input 
                            id='quantity' 
                            type='number' 
                            value={newPastry.quantity} 
                            onChange={(e) => setNewPastry({ ...newPastry, quantity: e.target.value })}
                            required
                        ></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input 
                            id='image' 
                            type='text' 
                            value={newPastry.image} 
                            onChange={(e) => setNewPastry({ ...newPastry, image: e.target.value })}
                        ></input>
                    </div>
                    <button onClick={handleSubmit}>Envoyer</button>
                </div>
            </div>
        );
    }
    else if (displayAdd === true && currentPastry) {
        return (
            <div className='add-pastries'>
                <div className='inputs'>
                    <button className='ajout-btn btn' onClick={() => {setDisplayAdd(!displayAdd); setCurrentPastry(undefined)}}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 className="title">Modifier une patisserie</h1>
                    <div className='input'>
                        <label htmlFor='name'></label>
                        <input id='name' 
                               type='text' 
                               value={currentPastry.name} 
                               required
                               onChange={(e) => setCurrentPastry({ ...currentPastry, name: e.target.value })}
                               ></input>
                    </div>

                    <div className='input'>
                       <label htmlFor='quantity'>Quantité</label>
                       <input id='quantity' 
                              type='number' 
                              value={currentPastry.quantity} 
                              required
                              onChange={(e) => setCurrentPastry({ ...currentPastry, quantity: e.target.value })}></input>
                    </div>

                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input id='image' 
                               type='text' 
                               value={currentPastry.image}
                               onChange={(e) => setCurrentPastry({ ...currentPastry, image: e.target.value })}></input>
                    </div>

                    <Button onClick={() => modifHandleSubmit()}
                            label="Envoyer"
                            width="80px"
                            height="30px"
                            color="antiquewhite"
                            backgroundColor="#052E33"
                            borderRadius="15px"
                            fontSize="0.8em"
                            margin="15px"/>
                </div>
            </div>
        );
    }
};

export default PastriesManagementPage;