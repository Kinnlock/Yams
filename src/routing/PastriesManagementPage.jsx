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
            <ul>
                {pastries.map(pastry => (
                    <li key={pastry.id}>{pastry.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PastriesManagementPage;