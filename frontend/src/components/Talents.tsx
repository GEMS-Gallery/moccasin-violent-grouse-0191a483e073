import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { backend } from 'declarations/backend';

interface Talent {
  name: string;
  description: string | null;
  icon: string;
  tier: number;
  column: number;
}

const Talents: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const result = await backend.getTalentTree();
        setTalents(result);
      } catch (error) {
        console.error('Error fetching talents:', error);
      }
    };

    fetchTalents();
  }, []);

  return (
    <Paper className="p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Talent Tree
      </Typography>
      <Grid container spacing={2}>
        {talents.map((talent, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="p-2">
              <Typography variant="h6">{talent.name}</Typography>
              <img src={talent.icon} alt={talent.name} className="w-12 h-12" />
              <Typography variant="body2">{talent.description}</Typography>
              <Typography variant="caption">Tier: {talent.tier}, Column: {talent.column}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Talents;
