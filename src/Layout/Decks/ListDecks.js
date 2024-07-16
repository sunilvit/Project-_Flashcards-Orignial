import ListDeckItem from "./ListDeckItem";

function ListDecks({decks}){
    console.log("Decks In DB: ", decks);
        return (
            <div>
                {decks.map((deck, index) => (
                    <ListDeckItem deck={deck} />
                ))}
            </div>
        )
}

export default ListDecks;