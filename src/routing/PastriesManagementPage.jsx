import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastriesManagementPage.css';

const PastriesManagementPage = () => {
    const [pastries, setPastries] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div className="PastriesManagementPage">
            <h1>Pastries Management</h1>
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
                        <button>Modifier</button> 
                        {/*Jade je te laisse mettre ton beau bouton*/}
                    </tr>
                    </>
                ))}
                    </tbody>
                </table>
        </div>
    );
};

export default PastriesManagementPage;