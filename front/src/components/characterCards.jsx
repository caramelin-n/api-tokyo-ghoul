import './css/characterCards.css';

export default function CharacterCards({ character, onClick }) {
return (
    <div className="card-container" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card">
        {/* Geometric background elements */}
        <div className="geometric-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Card content */}
        <div className="card-content">
          {character.image && (
            <div className="character-image">
              <img src={character.image} alt={character.name} loading="lazy" />
            </div>
          )}
          <div className="card-header">
            <h2 className="character-name">{character.name}</h2>
            <div className="ghoul-badge">
              {character.is_ghoul ? (
                <span className="badge-ghoul">GHOUL</span>
              ) : (
                <span className="badge-human">HUMAN</span>
              )}
            </div>
          </div>

          <div className="card-divider"></div>

          <div className="card-details">
            {character.age && (
              <p><span className="label">Age:</span> {character.age}</p>
            )}
            {character.status && (
              <p><span className="label">Status:</span> {character.status}</p>
            )}
          </div>

          {/* RGB accent corners */}
          <div className="corner corner-top-left"></div>
          <div className="corner corner-top-right"></div>
          <div className="corner corner-bottom-left"></div>
          <div className="corner corner-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}