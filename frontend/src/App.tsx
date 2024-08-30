import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const greetingMessage = await backend.greet(name);
    setGreeting(greetingMessage);
  }

  useEffect(() => {
    async function checkHealth() {
      try {
        const status = await backend.healthCheck();
        console.log('Health check status:', status);
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }
    checkHealth();
  }, []);

  return (
    <div>
      <h1>Elemental Shaman Guide</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greeting}</p>
    </div>
  );
}

export default App;
