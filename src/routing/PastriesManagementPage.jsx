//import
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/PastriesManagementPage.css";
import Button from '../components/Button';
import AddPastryForm from '../components/AddPastries';
import ModifPastries from '../components/ModifPastries';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Link } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

//Création des states
const PastriesManagementPage = ({ setDisplayDeco }) => {
    const [pastries, setPastries] = useState([]);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [currentPastry, setCurrentPastry] = useState(undefined);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [newPastry, setNewPastry] = useState({
        name: '',
        quantity: 1,
        image: '',
        choise:'',
    });
    const [files, setFiles] = useState(null);
    const [showError, setShowError] = useState(false); 

    const handleFileChange = (e) => {
        setFiles(e.target.files[0])
    }

    //Fonction qui requete l'api pour delete une pastries selctionné. Elle met à jour en suivant la nouvelle liste de pastries
    const deletePastry = (id) => {
        Swal.fire({
            title: "Attention !",
            text: "Cette action est irréversible",
            icon: "warning",
            showCancelButton: true,
            background: "#1B5959",
            color: "antiquewhite",
            confirmButtonColor: '#052E33',
            cancelButtonColor: "#A3241A",
            confirmButtonText: "Je confirme",
            cancelButtonText: "Annuler",
            width: "350px"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3001/api/pastry/${id}`, { withCredentials: true });
                    const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
                    setPastries(updatedResponse.data);
                    Swal.fire({
                        title: "La suppression a bien été effectuée",
                        icon: "success",
                        iconColor: "#042326",
                        background: "#1B5959",
                        color: "antiquewhite",
                        confirmButtonColor: '#052E33',
                        width: "350px"
                    });
                } catch (error) {
                    setError(error)
                    Swal.fire({
                        title: "Erreur",
                        text: "Une erreur est survenue lors de la suppression de la pâtisserie",
                        icon: "error",
                        background: "#1B5959",
                        color: "antiquewhite",
                        confirmButtonColor: '#052E33',
                    });
                }
            }
        });
    };

    //Fonction qui requete l'api pour modifié une pastries selectionner, elle à jour l'etat de pastries en suivant 
    const modifHandleSubmit = async () => {
        try {
            let id = currentPastry.id
            const response = await axios.put(`http://localhost:3001/api/pastry/${id}`, currentPastry, { withCredentials: true });


            setNewPastry({
                name: '',
                quantity: 1,
                image: ''
            });

            const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
            setPastries(updatedResponse.data);
            setCurrentPastry(undefined)
        }
        catch (error) {
            console.error('Error adding pastry:', error);
        }
    }

    //Fonction qui ajoute une pastries avec image, elle met à jour en suivant l'état de pastries
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', files);
        formData.append('pastry', JSON.stringify(newPastry));       
        try {
            const res = await axios.post(`http://localhost:3001/api/pastry`, formData, {
            withCredentials: true,
            headers: { "content-type": "multipart/form-data" }
          });
          const updatedResponse = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
          setPastries(updatedResponse.data);
          Swal.fire({
            title: "Votre pâtisserie a bien été ajoutée !",
            icon: "success",
            iconColor: "#042326",
            background: "#1B5959",
            customClass: {
                title: 'swal-title',
              },
            confirmButtonColor: '#052E33',
            width: "350px"})
        } catch (error) {
          console.error("Erreur lors de l'appel API :", error);
        }
      };

    //Fonction qui requete l'api pour ajouté une patisserie sans image mais un url d'image, elle met à jour en suivant la patisserie
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/pastry', newPastry, { withCredentials: true });


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
                confirmButtonText: 'Fermer cette fenêtre',
                width: "400px"
            });
        }
    };

    //Fonction qui quand on clic sur modifié, met les données de la pastry selectionner dans currentPastry afin de modifier currentPastry dans le component modifPastries
    const handleModifications = (pastry) => {
        setCurrentPastry(pastry);
        setDisplayAdd(!displayAdd);
    }

    //Fonction qui récupère toutes les pastries afin de les afficher dans le tableau lors du montage de la page dans le Dom (useEffect)
    //si il y a une erreur dans la récupération de la page alors on setShowError à true pour afficher la page d'erreur
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/pastries', { withCredentials: true });
                setPastries(response.data);
                setDisplayDeco(true);
                setIsConnected(true)
            } catch (error) {
                setIsConnected(false);
                setError(error)
                setShowError(true);
            }
        };
        fetchData();
    }, []);

    //Permet de créer la page d'erreur si l'ont est pas connecté
    if (showError) {
        return <ErrorPage message={"401 Interdit"}></ErrorPage>;
    }

    //vérifie si la personne est toujours connecté pour afficher ensuite la page le DOM
    if (isConnected) {
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
                    {/*  Le bouton gère le state de displayAdd qui est un booléen qui permet de gérer l'état de la page, s'il est true alors on affiche soit ajouté soit affiché*/}
                    <button className='ajout-btn btn' onClick={() => setDisplayAdd(!displayAdd)}>Ajouter une patisserie</button>
                    {error && <p className="error">An error occurred: {error.message}</p>}

                    <table>
                        <thead>
                            <tr>
                                <th className="column-name">Nom</th>
                                <th className="column-name">Photo</th>
                                <th className="column-name">Quantité</th>
                                <th className="column-name">Quantité gagnée</th>
                                <th className="column-name">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastries.map(pastrie => (
                                <tr key={pastrie.id}>
                                    <td>{pastrie.name}</td>
                                    {pastrie.image != "http://placehold.it/32x32" && (<td><img className="table-image" src={"http://localhost:3001/uploads/images/" + pastrie.image} alt={pastrie.name}/></td>)}
                                    {pastrie.image == "http://placehold.it/32x32" && (<td><img className="table-image" src={pastrie.image} alt={pastrie.name}/></td>)}
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
        //Si displayAdd est true mais qu'on a pas de currentPastry alors on ajoute. sinon on modifie
        } else if (displayAdd === true && currentPastry === undefined) {
            return <AddPastryForm newPastry={newPastry} setNewPastry={setNewPastry} handleSubmit={handleSubmit} displayAdd={displayAdd} setDisplayAdd={setDisplayAdd} handleFileChange={handleFileChange} handleUpload={handleUpload} files={files}></AddPastryForm>
        }
        else if (displayAdd === true && currentPastry) {
            return <ModifPastries currentPastry={currentPastry} setCurrentPastry={setCurrentPastry} modifHandleSubmit={modifHandleSubmit} displayAdd={displayAdd} setDisplayAdd={setDisplayAdd}></ModifPastries>
        }
    }
};

export default PastriesManagementPage;