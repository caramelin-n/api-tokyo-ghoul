import { useState, useEffect } from "react";
import CharacterCards from "./components/characterCards";
import CharacterModal from "./components/characterModal.jsx";
import Loading from "./components/loading.jsx";
import SearchBar from "./components/searchBar.jsx";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import './App.css';


function App(){
  const [ characters, setCharacters ] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const getCharacters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/characters');
      const data = await response.json();
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al conectar con Anteiku.");
      setLoading(false);
    } 
  }
  useEffect(() => {
    getCharacters()
  }, []);

  const filteredCharacters = Array.isArray(characters) ? characters.filter((char) => {
    const nameMatch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = char.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || descMatch;
  }) : [];
  return (
    <div className="App">
      <Navbar />
      {isLoading ? 
      <Loading /> : (
        <>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="header-actions">
          <button className="btn-open-modal" onClick={() => setShowModal(true)}>
            + NUEVO REGISTRO
          </button>
        </div>
        {showModal && (
          <Form 
            onCharacterCreated={() => {
              getCharacters(); // Recarga la lista
              setShowModal(false); // Cierra el modal al terminar
            }} 
            onClose={() => setShowModal(false)} // Función para cerrar sin guardar
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
            <p>No ghouls found in Anteiku.</p>
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