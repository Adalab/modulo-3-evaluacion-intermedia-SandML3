import '../styles/App.scss';
import { useState } from 'react';
import Quotes from '../data/quotes.json';



function App() {
  const [quotes, setQuotes] = useState(Quotes);
  const [newQuote, setNewQuote] = useState({
    character: '',
    quote: ''
  })

  const [searchFilters, setSearchFilters] = useState({
    character: '',
    quote: ''
  })

  const renderQuotes = quotes
    .filter(quote => {
      return quote.character.toLowerCase().includes(searchFilters.character.toLowerCase()) && quote.quote.toLowerCase().includes(searchFilters.quote.toLowerCase())})
    .map((quote, index) => {
      return <li key={index}>{quote.quote}-{quote.character}</li>
    })

  const handleNewQuote = (ev) => {
    setNewQuote({...newQuote, [ev.target.id]:ev.currentTarget.value});
  }

  
  const handleAddQuote = (ev) => {
    ev.preventDefault();
    setQuotes([...quotes, newQuote])
    setNewQuote({
      character: '',
      quote: '',
    })
  }

  const handleFilter = (ev) => {
    setSearchFilters({...searchFilters, [ev.target.name]: ev.target.value})
  }



  return (
    <div>
      <header>
        <h1>Frases de Friends</h1>
        <label htmlFor='quote-filter'>Filtrar por frase</label>
        <input 
        type="text" 
        id="quote" 
        name="quote"
        value={searchFilters.quote}
        onChange={handleFilter}
        ></input>

        <label htmlFor='character-filter'>Filtrar por personaje</label>
        <select 
        name='character' 
        id="character-filter"
        value={searchFilters.character}
        onChange={handleFilter}
        >
          <option value=''>Todos</option>
          <option value="Ross">Ross</option>
          <option value="Monica">Mónica</option>
          <option value="Joey">Joey</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
        </select>
      </header>
      
      <main>
        <section className='quotes'>
          <ul>
            {renderQuotes}
          </ul>
        </section>
        
        <section className='add_new_quote'>
          <h3>Añadir una nueva clase</h3>
          <label htmlFor='quote'>Frase</label>
          <input 
          type="text" 
          name="quote"
          id="quote"
          placeholder='Ej. Unagi!'
          value={newQuote.quote}
          onChange={handleNewQuote}
          ></input>

          <label htmlFor='character'>Personaje</label>
          <input 
          type="text" 
          id="character"
          name="character"
          placeholder='Ej. Ross'
          value={newQuote.character}
          onChange={handleNewQuote}
          ></input>

          <button onClick={handleAddQuote}>Añadir una nueva frase</button>

        </section>
      </main>
    </div>
  );
}

export default App;
