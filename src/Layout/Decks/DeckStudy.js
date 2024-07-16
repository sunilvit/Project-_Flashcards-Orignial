import Header from "../Header";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {readDeck} from "../../utils/api";
import CardView from "../Cards/CardView";

function DeckStudy(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(response => {
            setDeck(response)
            console.log("cards to study: ", deck.cards);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }, [deckId]);
    if (deck) {
        return (
            <>
                <Header></Header>
                <div className="container">
                    <nav>
                        <Link to='/'>Home</Link> /
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link> /
                        Study
                    </nav>
                    <h2>Study: {deck.name}</h2>
                    <CardView cards={deck.cards}></CardView>
                </div>
            </>
        )
    }
    return (
        <p>Loading...</p>
    )
}

export default DeckStudy;