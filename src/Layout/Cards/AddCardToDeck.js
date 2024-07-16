import Header from "../Header";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCard, readDeck} from "../../utils/api";

function AddCardToDeck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const initialState = {
        front: '',
        back: ''
    }
    const [formData, setFormData] = useState(initialState);

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(response => {
            setDeck(response)
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }, []);

    const handleCardChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleCardSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, formData, abortController.signal).then(response => {
            setFormData(initialState);
            console.log("Card Added: ", response);
        }).catch(
            error => console.log(error)
        )
    }
    return(
        <div>
            <Header/>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link> /
                    Add Card
                </nav>
                <h2>Add Card</h2>
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
                        <Link to={`/decks/${deckId}`}>Done</Link>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCardToDeck;