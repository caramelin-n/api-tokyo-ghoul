import { useState, useEffect } from "react";
import CharacterCards from "./components/characterCards";
import Loading from "./components/loading.jsx";
import SearchBar from "./components/searchBar.jsx";
import Navbar from "./components/navbar.jsx";


function App(){
  const [ characters, setCharacters ] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? 
      <Loading /> : (
        <div className="characters-grid">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map(char => (
              <CharacterCards key={char.id} character={char} />
            ))
          ) : (
            <p>No ghouls found in Anteiku.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App