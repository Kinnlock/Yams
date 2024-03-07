import Button from './Button';

const ModifPastries = ({ currentPastry, setCurrentPastry, modifHandleSubmit, displayAdd, setDisplayAdd }) => {
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

export default ModifPastries;