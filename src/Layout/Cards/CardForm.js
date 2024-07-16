import {Link} from "react-router-dom";

function CardForm({handleCardSubmit, formData, handleCardChange, deckId}){
    return(
        <form onSubmit={handleCardSubmit}>
            <label htmlFor='front'>Front
                <br/>
                <textarea id='front' name='front' rows='4' cols='50' placeholder='Front side of card'
                          onChange={handleCardChange} value={formData.front}/>
            </label>
            <br/>
            <br/>
            <label htmlFor='back'>Front
                <br/>
                <textarea id='back' name='back' rows='4' cols='50' placeholder='Back side of card'
                          onChange={handleCardChange} value={formData.back}/>
            </label>
            <br/>
            <div>
                <Link to={`/decks/${deckId}`} className='button-link cancel'>Done</Link>
                <button type='submit' className='button-link submit'>Save</button>
            </div>
        </form>
    )
}

export default CardForm;