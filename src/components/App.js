import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api';
// import Quotes from '../data/quotes.json';
import ls from '../services/ls';



function App() {
  const [warningText, setWarningText] = useState({
    text:'',
    className:''
  });
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    character: '',
    quote: ''
  })

  const [allCharacters, setAllCharacters] = useState([])

  useEffect(() => {
    callToApi().then((response) => {
      setQuotes(response);
      const characters = new Set(response.map(item => item.character))
      setAllCharacters([...characters])
    });
  }, []);

  const [searchFilters, setSearchFilters] = useState(ls.get('searchFilters', {
    character: '',
    quote: ''
  }));

  const renderCharacterOptions = () => {
    return allCharacters.map((character, index) => {
    return <option key={index} value={character.toLowerCase()}>{character}</option>})
  }

  const renderQuotes = quotes
    .filter(quote => {
      return quote.character.toLowerCase().includes(searchFilters.character.toLowerCase()) && quote.quote.toLowerCase().includes(searchFilters.quote.toLowerCase())})
    .map((quote, index) => {
      return <li key={index} className="main__quotes__quote">{quote.quote.charAt(0).toUpperCase() + quote.quote.slice(1)} - <span className='main__quotes__quote--character'>{quote.character.charAt(0).toUpperCase() + quote.character.slice(1).toLowerCase()}</span></li>
    })


  const handleNewQuote = (ev) => {
      setNewQuote({...newQuote, [ev.target.id]:ev.currentTarget.value})
  };


  const isNewCharacter = () => {
    if (quotes.indexOf(item => item.character.toLowerCase() === newQuote.character.toLocaleLowerCase()) === -1) {
       setAllCharacters([...allCharacters, newQuote.character.charAt(0).toUpperCase() + newQuote.character.slice(1)])
    }
  }
  
  const handleAddQuote = (ev) => {
    ev.preventDefault();
    isNewCharacter();
    if (!newQuote.character || !newQuote.quote) {
      setWarningText({
        className:'warning-text',
        text:'Debe rellenar todos los campos',
      })
    } else {
      setQuotes([...quotes, newQuote])

      setNewQuote({
        character: '',
        quote: '',
      });
      setWarningText('');
    }
  };



  const handleFilter = (ev) => {
    setSearchFilters({...searchFilters, [ev.target.name]: ev.target.value})
  };
  
  useEffect(() => {
    ls.set('searchFilters', {
      character: searchFilters.character,
      quote: searchFilters.quote
    });
  }, [searchFilters]);


  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Frases de Friends</h1>

        <form className='header__search'>

          <label htmlFor='quote-filter' className='header__search__label'>Filtrar por frase</label>
          <input
          type="text"
          id="quote"
          name="quote"
          className='header__search__input'
          value={searchFilters.quote}
          onChange={handleFilter}
          ></input>

          <label htmlFor='character-filter' className='header__search__label'>Filtrar por personaje</label>
          <select
          name='character'
          id="character-filter"
          className='header__search__input'
          value={searchFilters.character}
          onChange={handleFilter}
          >
            <option value=''>Todos</option>
            {renderCharacterOptions()}
            {/* <option value="Ross">Ross</option>
            <option value="Monica">Mónica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option> */}
          </select>

        </form>
      </header>
      
      <main className='main'>
        <section >
          <ul className='main__quotes'>
            {renderQuotes}
          </ul>
        </section>
        
        <form className='main__new_quote'>
          <h3 className='main__new_quote__title'>Añadir una nueva frase</h3>
           
          <p className={warningText.className}>{warningText.text}</p>

          <label htmlFor='quote' className='main__new_quote__label'>Frase</label>
          <input 
          type="text" 
          name="quote"
          id="quote"
          className='main__new_quote__input'
          placeholder='Ej. Unagi!'
          value={newQuote.quote}
          onChange={handleNewQuote}
          ></input>
         

          <label htmlFor='character' className='main__new_quote__label'>Personaje</label>
          <input 
          type="text" 
          id="character"
          name="character"
          className='main__new_quote__input'
          placeholder='Ej. Ross'
          value={newQuote.character}
          onChange={handleNewQuote}
          ></input>

          <button onClick={handleAddQuote} className='main__new_quote__button'>Añadir una nueva frase</button>

        </form>
      </main>
    </div>
  );
}

export default App;
