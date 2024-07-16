import DeckViewCardView from "./DeckViewCardView";

function DeckViewList({cards}) {
    if (cards) {
        return (
            <div>
                <h3>Cards: {cards.length}</h3>
                {cards.map((card, index) =>
                    <DeckViewCardView card={card} index={index}/>
                )}
            </div>
        )
    }
}

export default DeckViewList;