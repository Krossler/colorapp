import React, { useState } from 'react';

const DeleteForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/${name}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir a cor');
      }

      setMessage('Cor excluída com sucesso!');
      setName('');
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao excluir a cor');
    }
  };

  return (
    <div>
      <form className='deleteform' onSubmit={handleSubmit}>
        <h1>Erase Color</h1>
          <label>
            <span>Color Name:</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <button className='deletebtn' type="submit">Erase</button>
          {message && <p>{message}</p>} {/* Exibir a mensagem se existir */}
      </form>
      
    </div>
  );
};

export default DeleteForm;