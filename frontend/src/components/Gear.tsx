import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { backend } from 'declarations/backend';

interface GearItem {
  name: string;
  slot: string;
  stats: string;
  enchant: string | null;
  source: string | null;
}

const Gear: React.FC = () => {
  const [gear, setGear] = useState<GearItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGear = async () => {
      try {
        const result = await backend.getGearRecommendations();
        if ('ok' in result) {
          setGear(result.ok);
        } else {
          throw new Error(result.err);
        }
      } catch (error) {
        console.error('Error fetching gear:', error);
        setError('Failed to load gear recommendations. Please try again later.');
      }
    };

    fetchGear();
  }, []);

  if (error) {
    return (
      <Paper className="p-4">
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Recommended Gear
      </Typography>
      <Grid container spacing={2}>
        {gear.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="p-2">
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">Slot: {item.slot}</Typography>
              <Typography variant="body2">Stats: {item.stats}</Typography>
              {item.enchant && <Typography variant="body2">Enchant: {item.enchant}</Typography>}
              {item.source && <Typography variant="caption">Source: {item.source}</Typography>}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Gear;
