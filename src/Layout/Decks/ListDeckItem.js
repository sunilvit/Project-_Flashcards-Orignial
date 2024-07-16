import {Link} from "react-router-dom";
import './ListDeckItem.css'
import {useEffect, useState} from "react";
import {deleteDeck, readDeck} from "../../utils/api";

function ListDeckItem({deck, index}){
    const [cards, setCards] = useState([]);

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deck.id, abortController.signal).then(response => {
            setCards(response.cards);
            console.log("cards: ", cards.cards);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }, [deck]);

    const handleDeckDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Delete this deck?')){
            // const abortController = new AbortController();
            // deleteDeck(deck.id, abortController.signal).then(r => );
        }
    }

    if (cards){
        return(
            <div className="list-deck-item" key={index}>
                <h5>{deck.name}</h5>
                <h6>{cards.length} cards</h6>
                <p>{deck.description}</p>
                <div className="list-deck-item-links-container">
                    <div className="left-links">
                        <Link to={`/decks/${deck.id}`} className='button-link view'>View(TBD)</Link>
                        <Link to={`/decks/${deck.id}/study`} className='button-link study'>Study(TBD)</Link>
                    </div>
                    <div className="right-links">
                        <button onClick={handleDeckDelete} className='button-link delete'>Delete(TBD)</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <p>Loading...</p>
    )

}

export default ListDeckItem