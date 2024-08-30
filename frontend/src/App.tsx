import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress, Snackbar } from '@mui/material';
import { backend } from 'declarations/backend';

const Home = React.lazy(() => import('./components/Home'));
const Talents = React.lazy(() => import('./components/Talents'));
const Runes = React.lazy(() => import('./components/Runes'));
const Gear = React.lazy(() => import('./components/Gear'));
const Stats = React.lazy(() => import('./components/Stats'));

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          backend.getTalentTree(),
          backend.getRunes(),
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
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Elemental Shaman Guide - Season of Discovery
          </Typography>
          <nav>
            <Link to="/" className="text-white mx-2">Home</Link>
            <Link to="/talents" className="text-white mx-2">Talents</Link>
            <Link to="/runes" className="text-white mx-2">Runes</Link>
            <Link to="/gear" className="text-white mx-2">Gear</Link>
            <Link to="/stats" className="text-white mx-2">Stats</Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container className="mt-4">
        <React.Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/talents" element={<Talents />} />
            <Route path="/runes" element={<Runes />} />
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
