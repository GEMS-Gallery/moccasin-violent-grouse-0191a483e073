import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress, Snackbar, Button } from '@mui/material';
import { backend } from 'declarations/backend';

const Home = React.lazy(() => import('./components/Home'));
const Talents = React.lazy(() => import('./components/Talents'));
const Gear = React.lazy(() => import('./components/Gear'));
const Stats = React.lazy(() => import('./components/Stats'));

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          backend.getTalentBuilds(),
          backend.getGearRecommendations(),
          backend.getStatPriority()
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <AppBar position="static" className="bg-[#0070DE]">
        <Toolbar className="flex flex-wrap justify-between">
          <Typography variant="h6" component="div" className="flex-grow">
            Elemental Shaman Guide - Season of Discovery
          </Typography>
          <nav className="flex flex-wrap">
            <Button component={Link} to="/" color="inherit" className="mx-4 my-2">Home</Button>
            <Button component={Link} to="/talents" color="inherit" className="mx-4 my-2">Talents & Runes</Button>
            <Button component={Link} to="/gear" color="inherit" className="mx-4 my-2">Gear</Button>
            <Button component={Link} to="/stats" color="inherit" className="mx-4 my-2">Stats</Button>
          </nav>
        </Toolbar>
      </AppBar>

      <Container className="mt-4">
        <React.Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/talents" element={<Talents />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </React.Suspense>
      </Container>

      <Snackbar
        open={error !== null}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      />
    </div>
  );
}

export default App;
