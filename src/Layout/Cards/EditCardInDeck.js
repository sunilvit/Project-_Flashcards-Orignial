import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../Header";
import {useEffect, useState} from "react";
import {readCard, readDeck, updateCard, updateDeck} from "../../utils/api";
import CardForm from "./CardForm";

function EditCardInDeck(){
    const {deckId, cardId} = useParams();
    const [deck, setDeck] = useState({})
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(response => {
            setDeck(response)
        }).catch(
            error => console.log(error)
        )
        readCard(cardId, abortController.signal).then(response => {
            setFormData(response)
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
        updateCard(formData, abortController.signal).then(response => {
            navigate(`/decks/${deckId}`);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }

    return(
        <>
            <Header/>
            <div className="container">
                <nav>
                    <Link to='/'>Home</Link> /
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link> /
                    Edit Card {cardId}
                </nav>
                <p>DeckId: {deckId} and Card: {cardId}</p>
                <h2>Edit Card</h2>
                <CardForm
                    handleCardSubmit = {handleCardSubmit}
                    formData={formData}
                    handleCardChange={handleCardChange}
                    deckId={deckId}>
                </CardForm>
            </div>
        </>

    )
}

export default EditCardInDeck;