import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/PastriesManagementPage.css";
import Button from '../components/Button';
import AddPastryForm from '../components/AddPastries';
import ModifPastries from '../components/ModifPastries';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Link } from 'react-router-dom';

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
    const deletePastry = (id) => {
        Swal.fire({
          title: "Êtes-vous sûr ?",
          text: "Cette action est irréversible",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmer"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`http://localhost:3001/api/pastry/${id}`, { withCredentials: true });
              console.log(response);
              const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
              setPastries(updatedResponse.data);
              Swal.fire({
                title: "Supprimé",
                text: "La pâtisserie a bien été supprimée",
                icon: "success"
              });
            } catch (error) {
              console.error('Error delete pastry:', error);
              Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de la suppression de la pâtisserie",
                icon: "error"
              });
            }
          }
        });
      };

    const modifHandleSubmit = async () => {
        try {
            let id = currentPastry.id
            const response = await axios.put (`http://localhost:3001/api/pastry/${id}`, currentPastry, { withCredentials: true });


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

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            Swal.fire({
                position: "top-end",
                title: "Votre pâtisserie a bien été ajoutée !",
                icon: "success",
                iconColor: "#042326",
                background: "#1B5959",
                customClass: {
                    title: 'swal-title',
                  },
                showConfirmButton: false,
                timer: 1500,
                width: "400px"
              })

        }
        catch (error) {
            console.error('Error adding pastry:', error);

            Swal.fire({
                title: "Oups !",
                text: "Quelque chose n'a pas fonctionné. Veuillez recommencer.",
                icon: 'error',
                background: "#1B5959",
                color: "antiquewhite",
                customClass: {
                    title: 'swal-title',
                  },
                confirmButtonColor: '#052E33',
                confirmButtonTextColor: 'antiquewhite',
                confirmButtonText: 'Fermer cette fenêtre',
                width: "400px"
            });
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
                setError(error);
            } catch (error) {
                Swal.fire({
                    title: "Oups !",
                    text: "Veuillez d'abord vous connecter.",
                    icon: 'error',
                    background: "#1B5959",
                    color: "antiquewhite",
                    customClass: {
                        title: 'swal-title',
                      },
                    confirmButtonColor: '#052E33',
                    confirmButtonTextColor: 'antiquewhite',
                    confirmButtonText: 'Aller à la page de connection',
                    width: "400px"
                }).then((response) => {
                    if(response.isConfirmed){
                        window.location.href = '/'
                    }
                })
            }
        };
        fetchData();
    }, []);

    if (displayAdd === false) {
        return (
            <div className="PastriesManagementPage">
                <div className="retour-button">
                    <Link to="/game">
                        <Button 
                        label="Retour au jeu"
                        width="130px"
                        height="50px"
                        color="antiquewhite"
                        backgroundColor="#052E33"
                        borderRadius="15px"
                        fontSize="0.9em"
                        margin="25px"
                        />
                    </Link>
                </div>

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
                                    <Button onClick={() => deletePastry(pastrie.id)}
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
        return <AddPastryForm newPastry={newPastry} setNewPastry={setNewPastry} handleSubmit={handleSubmit} displayAdd={displayAdd} setDisplayAdd={setDisplayAdd}></AddPastryForm>
    }
    else if (displayAdd === true && currentPastry) {
        return <ModifPastries currentPastry={currentPastry} setCurrentPastry={setCurrentPastry} modifHandleSubmit={modifHandleSubmit} displayAdd={displayAdd} setDisplayAdd={setDisplayAdd}></ModifPastries>
    }
};

export default PastriesManagementPage;