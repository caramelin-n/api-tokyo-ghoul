import { useState, useEffect } from "react";
import CharacterCards from "./components/characterCards";

function App(){
  const [ characters, setCharacters ] = useState([]);
  const [Loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <h1>Tokyo Ghoul Database</h1>
      {Loading ? <p>Cargando ghouls...</p> : (
        <div className="characters-grid">
          {characters.map(char => (
            <CharacterCards key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App