import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { backend } from 'declarations/backend';

interface Rune {
  name: string;
  description: string;
  effect: string | null;
  icon: string;
  slot: string;
}

const Runes: React.FC = () => {
  const [runes, setRunes] = useState<Rune[]>([]);

  useEffect(() => {
    const fetchRunes = async () => {
      try {
        const result = await backend.getRunes();
        setRunes(result);
      } catch (error) {
        console.error('Error fetching runes:', error);
      }
    };

    fetchRunes();
  }, []);

  return (
    <Paper className="p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Runes
      </Typography>
      <Grid container spacing={2}>
        {runes.map((rune, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="p-2">
              <Typography variant="h6">{rune.name}</Typography>
              <img src={rune.icon} alt={rune.name} className="w-12 h-12" />
              <Typography variant="body2">{rune.description}</Typography>
              {rune.effect && <Typography variant="body2">Effect: {rune.effect}</Typography>}
              <Typography variant="caption">Slot: {rune.slot}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Runes;
