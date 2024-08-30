import React, { useState } from 'react';
import { Button, Typography, Container, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

function App() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incrementCounter = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await backend.increment();
      setCount(Number(result));
    } catch (err) {
      console.error('Error incrementing counter:', err);
      setError('Failed to increment counter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h4" component="h1" gutterBottom>
        Simple Counter App
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Count: {count !== null ? count : 'N/A'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={incrementCounter}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Increment'}
      </Button>
      {error && (
        <Typography color="error" className="mt-4">
          {error}
        </Typography>
      )}
    </Container>
  );
}

export default App;
