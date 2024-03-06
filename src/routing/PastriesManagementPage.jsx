import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';
import Button from '../components/Button';

const PastriesManagementPage = () => {
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

<<<<<<< HEAD
    //useStatte pour la modification des inputs
    const [pastryName, setPastryName] = useState("");
    const [pastryQuantity, setPastryQuantity] = useState(0);
    const [pastryImage, setPastryImage] = useState("");

    const handleModifications = (pastry) => {
=======
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post ('http://localhost:3001/api/pastry', newPastry, { withCredentials: true });

            console.log('Patiserie ajouté:', response.data);

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
>>>>>>> b140a779f7e4eb47f4c6a07776551ca5eaee57e1
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

    if (displayAdd === false) {
        return (
            <div className="PastriesManagementPage">
                <h1 className="title">Pastries Management</h1>
                <button className='ajout-btn' onClick={() => setDisplayAdd(!displayAdd)}>Ajouter une patisserie</button>
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
<<<<<<< HEAD
                {pastries.map(pastrie => (
                    <>
                    <tr key={pastrie.id}>
                        <td>{pastrie.name}</td>
                        <td>{pastrie.quantity}</td>
                        <td>{pastrie.quantityWon}</td>
                        <td><Button onClick={() => handleModifications(pastrie)}
                                label="Modifier"
                                width="80px"
                                height="25px"
                                color="antiquewhite"
                                backgroundColor="#052E33"
                                borderRadius="15px"
                                fontSize="0.8em"/> </td>
                    </tr>
                    </>
                ))}
                    </tbody>
                </table>
        </div>
    );
    else if(displayAdd===true && currentPastry == undefined){
=======
                        {pastries.map(pastrie => (
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
                                    />
                                </td>
                                <td><Button onClick={() => deletePastry(pastrie.id)}
                                            label="Supprimer"
                                            width="180px"
                                            height="40px"
                                            color="antiquewhite"
                                            backgroundColor="red"
                                            borderRadius="15px"
                                            fontSize="1em"
                                            margin="25px"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else if (displayAdd === true && currentPastry === undefined) {
>>>>>>> b140a779f7e4eb47f4c6a07776551ca5eaee57e1
        return (
            <div className='add-pastries'>
                <div className='inputs'>
                    <button className='ajout-btn' onClick={() => setDisplayAdd(!displayAdd)}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 >Ajouter une patisserie</h1>
                    <div className='input'>
<<<<<<< HEAD
                        <label htmlFor='name'>Nom</label>
                        <input id='name' 
                               type='text' 
                               required
                               value={pastryName}
                               onChange={(e) => setPastryName(e.target.value)}></input>
                    </div>
                    <div className='input'>
                       <label htmlFor='quantity'>Quantité</label>
                       <input id='quantity' 
                              type='number' 
                              required
                              value={pastryQuantity}
                              onChange={(e) => setPastryQuantity(e.target.value)}></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input id='image' 
                               type='text'
                               value={pastryImage}
                               onChange={(e) => setPastryImage(e.target.value)}></input>
=======
                        <label htmlFor='pastryName'>Nom</label>
                        <input 
                            id='pastryName' 
                            type='text' 
                            value={newPastry.pastryName} 
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
>>>>>>> b140a779f7e4eb47f4c6a07776551ca5eaee57e1
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
<<<<<<< HEAD
                <button className='ajout-btn' onClick={() => {setDisplayAdd(!displayAdd); setCurrentPastry(undefined)}}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 className="title">Ajouter une patisserie</h1>
=======
                    <button className='ajout-btn' onClick={() => {setDisplayAdd(!displayAdd); setCurrentPastry(undefined)}}>{displayAdd ? "Retour" : "Ajouter une patisserie"}</button>
                    <h1 >Modifier une patisserie</h1>
>>>>>>> b140a779f7e4eb47f4c6a07776551ca5eaee57e1
                    <div className='input'>
                        <label htmlFor='name'></label>
                        <input id='name' 
                               type='text' 
                               value={currentPastry.name} 
                               required
                               onChange={(e) => setPastryName(e.target.value)}
                               ></input>
                    </div>

                    <div className='input'>
                       <label htmlFor='quantity'>Quantité</label>
                       <input id='quantity' 
                              type='number' 
                              value={currentPastry.quantity} 
                              required
                              onChange={(e) => setPastryQuantity(e.target.value)}></input>
                    </div>

                    <div className='input'>
                        <label htmlFor='image'>URL de l'image</label>
                        <input id='image' 
                               type='text' 
                               value={currentPastry.image}
                               onChange={(e) => setPastryImage(e.target.value)}></input>
                    </div>

                    <Button label="Envoyer"
                            width="80px"
                            height="30px"
                            color="antiquewhite"
                            backgroundColor="#052E33"
                            borderRadius="15px"
                            fontSize="0.8em"/>
                </div>
            </div>
        );
    }
};

export default PastriesManagementPage;