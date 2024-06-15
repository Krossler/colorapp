import React, { useState, useEffect } from 'react';


const ColorList = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    fetchColors();
  };

  return (
    <div>
      <h2>Colors</h2>
      <ul className='list'>
        {colors.map((color) => (
          <li key={color._id}>
            <span style={{ backgroundColor: color.hex }} className="color-block"></span>
            {color.name} - {color.hex}
          </li>
        ))}
      </ul>
      <button onClick={handleButtonClick}>Atualizar Lista</button>
    </div>
  );
};

export default ColorList;