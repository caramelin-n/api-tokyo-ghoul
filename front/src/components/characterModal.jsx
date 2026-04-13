import './css/characterModal.css';
import { useState } from 'react';

const CharacterModal = ({ character, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: character.name,
    age: character.age,
    gender: character.gender,
    status: character.status,
    description: character.description,
    kagune: character.kagune,
    quinque: character.quinque,
    is_ghoul: character.is_ghoul
  });

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'checkbox' ? checked : (name === 'age' ? parseInt(value, 10) : value)
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/characters/${character.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });

      if (response.ok) {
        alert('Personaje actualizado exitosamente! ✨');
        onEdit();
        onClose();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el personaje');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${character.name}? Esta acción no se puede deshacer.`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/characters/${character.id}`, { 
          method: 'DELETE' 
        });

        if (response.ok) {
          alert('Personaje eliminado exitosamente!');
          onDelete();
          onClose();
        } else {
          alert('Error al eliminar el personaje');
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el personaje');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content detail-modal">
        <button className="close-x" onClick={onClose}>&times;</button>
        
        <div className="modal-body-layout">
          <div className="modal-image-side">
            <img src={character.image} alt={character.name} className="detail-img" />
            <h2 className="neon-text-pink">{character.name}</h2>
            <p className="specie-tag">{character.is_ghoul ? 'GHOUL' : 'HUMAN'}</p>
          </div>

          <div className="modal-info-side">
            {!isEditing ? (
              <>
                <p><strong>AGE:</strong> {character.age}</p>
                <p><strong>GENDER:</strong> {character.gender}</p>
                <p><strong>STATUS:</strong> {character.status}</p>
                <p><strong>DESCRIPTION:</strong> {character.description}</p>
                <p><strong>KAGUNE/QUINQUE:</strong> {character.kagune || character.quinque || 'None'}</p>
                
                <div className="modal-actions">
                  <button className="btn-edit" onClick={() => setIsEditing(true)}>
                    EDITAR PERSONAJE
                  </button>
                  <button className="btn-delete" onClick={handleDelete}>
                    ELIMINAR SUJETO
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="edit-form">
                  <div className="form-input-group">
                    <label>NOMBRE:</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editData.name} 
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-input-group">
                    <label>EDAD:</label>
                    <input 
                      type="number" 
                      name="age" 
                      value={editData.age} 
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-input-group">
                    <label>GÉNERO:</label>
                    <select name="gender" value={editData.gender} onChange={handleEditChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-input-group">
                    <label>ESTADO:</label>
                    <select name="status" value={editData.status} onChange={handleEditChange}>
                      <option value="alive">Alive</option>
                      <option value="dead">Dead</option>
                    </select>
                  </div>
                  <div className="form-input-group">
                    <label>KAGUNE:</label>
                    <input 
                      type="text" 
                      name="kagune" 
                      value={editData.kagune} 
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-input-group">
                    <label>QUINQUE:</label>
                    <input 
                      type="text" 
                      name="quinque" 
                      value={editData.quinque} 
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-input-group">
                    <label>DESCRIPCIÓN:</label>
                    <textarea 
                      name="description" 
                      value={editData.description} 
                      onChange={handleEditChange}
                      rows="3"
                    />
                  </div>
                  <div className="form-input-group checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        name="is_ghoul" 
                        checked={editData.is_ghoul} 
                        onChange={handleEditChange}
                      />
                      <span>Es Ghoul</span>
                    </label>
                  </div>

                  <div className="modal-actions">
                    <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
                      CANCELAR
                    </button>
                    <button className="btn-save-edit" onClick={handleSaveEdit}>
                      GUARDAR CAMBIOS
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;