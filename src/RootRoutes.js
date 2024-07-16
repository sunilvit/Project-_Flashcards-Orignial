import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";
import DeckStudy from "./Layout/Decks/DeckStudy";
import DeckView from "./Layout/Decks/DeckView";
import CreateNewDeck from "./Layout/Decks/CreateNewDeck";
import DeckEdit from "./Layout/Decks/DeckEdit";
import AddCardToDeck from "./Layout/Cards/AddCardToDeck";
import EditCardInDeck from "./Layout/Cards/EditCardInDeck";

function RootRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Layout />}></Route>
            <Route path='decks/:deckId' element={<DeckView />} />
            <Route path='decks/:deckId/edit' element={<DeckEdit />} />
            <Route path='decks/:deckId/cards/new' element={<AddCardToDeck />} />
            <Route path='decks/:deckId/cards/:cardId/edit' element={<EditCardInDeck />} />
            <Route path='decks/:deckId/study' element={<DeckStudy />} />
            <Route path='decks/new' element={<CreateNewDeck />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RootRoutes