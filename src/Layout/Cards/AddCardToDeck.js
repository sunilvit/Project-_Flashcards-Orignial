import Header from "../Header";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCard, readDeck} from "../../utils/api";
import CardForm from "./CardForm";

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
                <CardForm
                    handleCardSubmit = {handleCardSubmit}
                    formData={formData}
                    handleCardChange={handleCardChange}
                    deckId={deckId}>
                </CardForm>
            </div>
        </div>
    )
}

export default AddCardToDeck;