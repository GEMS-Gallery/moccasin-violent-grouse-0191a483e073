import React from 'react';
import { Typography, Paper } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Paper className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Elemental Shaman Guide for Season of Discovery
      </Typography>
      <Typography variant="body1" paragraph>
        This guide provides comprehensive information on talents, runes, gear, and stat priorities for Elemental Shamans in the Season of Discovery.
      </Typography>
      <Typography variant="body1">
        Use the navigation menu to explore different sections of the guide.
      </Typography>
    </Paper>
  );
};

export default Home;
