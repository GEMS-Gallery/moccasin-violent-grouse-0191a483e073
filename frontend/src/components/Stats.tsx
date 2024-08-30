import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { backend } from 'declarations/backend';

interface Stat {
  name: string;
  value: number;
  description: string | null;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await backend.getStatPriority();
        if ('ok' in result) {
          setStats(result.ok);
        } else {
          throw new Error(result.err);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load stat priorities. Please try again later.');
      }
    };

    fetchStats();
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
        Stat Priority
      </Typography>
      <List>
        {stats.map((stat, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${index + 1}. ${stat.name}`}
              secondary={stat.description}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Stats;
