import { useState, useEffect, useCallback } from "react";
import CharacterCards from "./components/characterCards";
import CharacterModal from "./components/characterModal.jsx";
import Loading from "./components/loading.jsx";
import SearchBar from "./components/searchBar.jsx";
import FilterButtons from "./components/filterButtons.jsx";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import './App.css';


function App(){
  const [ characters, setCharacters ] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const handleSelectCharacter = useCallback((char) => {
    setSelectedCharacter(char);
  }, [])

  const getCharacters = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/characters');
      const data = await response.json();
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al conectar con la base de datos");
      setLoading(false);
    } 
  }, []);

  useEffect(() => {
    getCharacters()
  }, [getCharacters]);

  const filteredCharacters = Array.isArray(characters) ? characters.filter((char) => {
    const nameMatch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = char.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const searchMatches = nameMatch || descMatch;

    let typeMatches = true;
    if (typeFilter === 'ghoul') {
      typeMatches = char.is_ghoul === true;
    } else if (typeFilter === 'human') {
      typeMatches = char.is_ghoul === false;
    }

    return searchMatches && typeMatches;
  }) : [];
  return (
    <div className="App">
      <Navbar />
      {isLoading ? 
      <Loading /> : (
        <>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButtons typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        <div className="header-actions">
          <button className="btn-open-modal" onClick={() => setShowModal(true)}>
            + NUEVO REGISTRO
          </button>
        </div>
        {showModal && (
          <Form 
            onCharacterCreated={() => {
              getCharacters();
              setShowModal(false);
            }} 
            onClose={() => setShowModal(false)}
          />
        )}
        <div className="characters-grid">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map(char => (
              <CharacterCards 
                key={char.id} 
                character={char} 
                onClick={() => setSelectedCharacter(char)}
              />
            ))
            
          ) : (
            <p>No characters found.</p>
          )}
        </div>
        
        {selectedCharacter && (
          <CharacterModal 
            character={selectedCharacter} 
            onClose={() => setSelectedCharacter(null)}
            onDelete={getCharacters}
            onEdit={getCharacters}
          />
        )}
      </>
      )}
    </div>
  )
}

export default App