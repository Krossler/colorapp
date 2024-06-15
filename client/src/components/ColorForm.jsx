import React, { useState } from 'react';

const ColorForm = () => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = { name, hex };

    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      setMessage('Dados enviados com sucesso!');
      setName('');
      setHex('');
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao enviar os dados');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Post Color</h1>
        <label>
          <span>Nome:</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          <span>HEX:</span>
          <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
        {message && <p>{message}</p>} {}
      </form>
      
    </div>
  );
};

export default ColorForm;