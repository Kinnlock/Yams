import Button from './components/Button';
const AddPastryForm = ({ newPastry, setNewPastry, handleSubmit }) => {
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
                <Button onClick={() => handleSubmit()}
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
};

export default AddPastryForm;