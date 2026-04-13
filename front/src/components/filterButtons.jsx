import './css/filterButtons.css';

const FilterButtons = ({ typeFilter, setTypeFilter }) => {
  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setTypeFilter('all')}
        >
          TODOS
        </button>
        <button 
          className={`filter-btn ghoul ${typeFilter === 'ghoul' ? 'active' : ''}`}
          onClick={() => setTypeFilter('ghoul')}
        >
          GHOULS
        </button>
        <button 
          className={`filter-btn human ${typeFilter === 'human' ? 'active' : ''}`}
          onClick={() => setTypeFilter('human')}
        >
          HUMANOS
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
