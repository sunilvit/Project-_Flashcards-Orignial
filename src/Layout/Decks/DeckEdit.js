import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../Header";
import {useEffect, useState} from "react";
import {createDeck, readDeck, updateDeck} from "../../utils/api";

function DeckEdit(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        updateDeck(formData, abortController.signal).then(response => {
            navigate(`/decks/${response.id}`);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(response => {
            setDeck(response)
            setFormData(response);
            console.log("cards to study: ", deck.cards);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }, [deckId]);
    return(
        <>
        <Header/>
        <div className="container">
            <nav>
                <Link to='/'>Home</Link> /
                <Link to={`/decks/${deckId}`}>{deck.name}</Link> /
                Edit Deck
            </nav>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name
                    <br/>
                    <input type='text' id='name' name='name' size='50'
                           onChange={handleChange} value={formData.name}/>
                </label>
                <br/>
                <br/>
                <label htmlFor='description'>
                    Description
                    <br/>
                    <textarea id='description' name='description' rows="5" cols="50"
                              onChange={handleChange} value={formData.description}/>
                </label>
                <div>
                    <button type='reset' onClick={() => navigate(`/decks/${deck.id}`)}>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default DeckEdit;