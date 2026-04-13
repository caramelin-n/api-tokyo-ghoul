import React, { useState } from 'react';
import './css/form.css';

const Form = ({ onCharacterCreated, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    status: 'alive',
    description: '',
    is_ghoul: true,
    image: '',
    kagune: '',
    quinque: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;
    
    if (name === 'age' && value !== '') {
      finalValue = parseInt(value, 10);
    }
    
    setFormData({ 
      ...formData, 
      [name]: finalValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Personaje creado exitosamente");
      setFormData({
        name: '',
        age: '',
        gender: '',
        status: 'alive',
        description: '',
        is_ghoul: true,
        image: '',
        kagune: '',
        quinque: ''
      });
      onCharacterCreated();
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">NUEVO REGISTRO</h2>
        
        <form onSubmit={handleSubmit} className="ghoul-form">
          <div className="form-group">
            <input 
              name="name" 
              placeholder="Nombre del Ghoul..." 
              onChange={handleChange} 
              value={formData.name}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input 
                name="age" 
                type="number" 
                placeholder="Edad..." 
                onChange={handleChange} 
                value={formData.age}
                required
              />
            </div>
            <div className="form-group">
              <select 
                name="gender" 
                onChange={handleChange} 
                value={formData.gender}
                required
              >
                <option value="">Género</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select 
                name="status" 
                onChange={handleChange} 
                value={formData.status}
              >
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input 
                  type="checkbox" 
                  name="is_ghoul" 
                  onChange={handleChange} 
                  checked={formData.is_ghoul}
                />
                <span>Es Ghoul</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <input 
              name="image" 
              type="url" 
              placeholder="URL de imagen..." 
              onChange={handleChange} 
              value={formData.image}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input 
                name="kagune" 
                placeholder="Kagune..." 
                onChange={handleChange} 
                value={formData.kagune}
              />
            </div>
            <div className="form-group">
              <input 
                name="quinque" 
                placeholder="Quinque..." 
                onChange={handleChange} 
                value={formData.quinque}
              />
            </div>
          </div>

          <div className="form-group">
            <textarea 
              name="description" 
              placeholder="Descripción..." 
              onChange={handleChange} 
              value={formData.description}
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              CANCELAR
            </button>
            <button type="submit" className="btn-add">CREAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;