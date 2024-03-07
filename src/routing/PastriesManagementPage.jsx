import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';
import Button from '../components/Button';
import AddPastryForm from '../components/AddPastries';
import ModifPastries from '../components/ModifPastries';

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
                    <h1 className="title">Gestion du stock</h1>
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
        <AddPastryForm newPastry={newPastry} setNewPastry={setNewPastry} handleSubmit={handleSubmit}></AddPastryForm>
    }
    else if (displayAdd === true && currentPastry) {
        <ModifPastries currentPastry={currentPastry} setCurrentPastry={currentPastry} modifHandleSubmit={modifHandleSubmit}></ModifPastries>
    }
};

export default PastriesManagementPage;