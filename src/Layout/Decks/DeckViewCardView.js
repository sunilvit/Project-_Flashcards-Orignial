import {Link, useNavigate} from "react-router-dom";
import {deleteCard, deleteDeck} from "../../utils/api";

function DeckViewCardView({card}){
    const navigate = useNavigate();

    const handleCardDelete = (cardId) => {
        if (window.confirm('Delete this card?\n\n You will not be able to recover it.')){
            const abortController = new AbortController();
            deleteCard(cardId, abortController.signal).then(response =>{
                console.log(`Deleted Card: ${cardId} Successfully!!`)
                navigate(0);
            }).catch(
                error => console.log(error)
            )
        }
    }
    return(
        <div>
            <table>
                <tbody>
                <tr>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                </tr>
                <tr>
                    <td><Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}>Edit</Link></td>
                    <td>
                        <button onClick={() => handleCardDelete(card.id)}>Delete(TBD)</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DeckViewCardView;