import React, { useState } from 'react';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hexRegex = /^#[0-9a-fA-F]{6}$/;
    if (!hexRegex.test(hex)) {
      setMessage('Código HEX inválido');
      return;
    }

    const data = { name, hex };

    try {
      const response = await fetch(`http://localhost:3001/api/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a cor');
      }

      setMessage('Cor atualizada com sucesso!');
      setName('');
      setHex('');
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao atualizar a cor');
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
      <h1>Update Color</h1>
        <label>
          <span>Color Name:</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          <span>HEX:</span>
          <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update</button>
        {message && <p>{message}</p>} {}
      </form>
      
    </div>
  );
};

export default UpdateForm;