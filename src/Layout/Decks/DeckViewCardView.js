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
        <div className="list-deck-item">
            <table>
                <tbody>
                <tr>
                    <td className={'table-left'}>{card.front}</td>
                    <td className={'table-right'}>{card.back}</td>
                </tr>
                <tr>
                    <td className={'table-left'}></td>
                    <td className={'table-right'}>
                        <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}
                              className='button-link edit'>Edit</Link>
                        <button onClick={() => handleCardDelete(card.id)} className='button-link delete'>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DeckViewCardView;