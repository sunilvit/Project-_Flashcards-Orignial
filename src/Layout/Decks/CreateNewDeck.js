import Header from "../Header";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {createDeck, listDecks} from "../../utils/api";

function CreateNewDeck(){
    const navigate = useNavigate();
    const initialState = {
        name: '',
        description: ''
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        createDeck(formData, abortController.signal).then(response => {
            navigate(`/decks/${response.id}`);
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
                Create Deck
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name
                    <br/>
                    <input type='text' id='name' name='name' size='50' placeholder='Deck Name'
                           onChange={handleChange} value={formData.name}/>
                </label>
                <br />
                <br />
                <label htmlFor='description'>
                    Description
                    <br/>
                    <textarea id='description' name='description' rows="5" cols="50" placeholder='Brief description of the deck'
                              onChange={handleChange} value={formData.description}/>
                </label>
                <div>
                    <button type='reset' onClick={() => navigate("/")}>Cancel</button>
                    <button type='submit' >Submit</button>
                </div>
            </form>
        </div>
        </>
)
}

export default CreateNewDeck;