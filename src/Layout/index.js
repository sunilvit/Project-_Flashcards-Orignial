import React, {useEffect, useState} from "react";
import Header from "./Header";
import {listDecks} from "../utils/api";
import ListDecks from "./Decks/ListDecks";
import {Link} from "react-router-dom";
import './index.css'

function Layout() {
    const [decks, setDecks] = useState([]);
    useEffect( () => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(response => {
            setDecks(response);
        }).catch(
            error => console.log(error)
        )
        return () => abortController.abort();
    }, []);
    if (decks) {
        return (
            <>
                <Header/>
                <div className="container">
                    <h2>Decks: {decks.length}</h2>
                    <Link to='/decks/new' className="button-link create">Create Deck</Link>
                    <ListDecks decks={decks}/>
                </div>
            </>
        );
    }
    return <p>Loading...</p>
}

export default Layout;
