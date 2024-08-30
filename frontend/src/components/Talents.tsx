import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Tabs, Tab, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface Talent {
  name: string;
  description: string;
  icon: string;
  tier: number;
  column: number;
  points: number;
  maxPoints: number;
}

interface Rune {
  name: string;
  description: string;
  icon: string;
  slot: string;
}

interface TalentBuild {
  name: string;
  description: string;
  talents: Talent[];
  runes: Rune[];
}

const Talents: React.FC = () => {
  const [talentBuilds, setTalentBuilds] = useState<TalentBuild[]>([]);
  const [selectedBuild, setSelectedBuild] = useState(0);

  useEffect(() => {
    const fetchTalentBuilds = async () => {
      try {
        const result = await backend.getTalentBuilds();
        setTalentBuilds(result);
      } catch (error) {
        console.error('Error fetching talent builds:', error);
      }
    };

    fetchTalentBuilds();
  }, []);

  const handleBuildChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedBuild(newValue);
  };

  return (
    <Paper className="p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Talents and Runes
      </Typography>
      
      <Tabs value={selectedBuild} onChange={handleBuildChange} aria-label="talent builds">
        {talentBuilds.map((build, index) => (
          <Tab label={build.name} key={index} />
        ))}
      </Tabs>

      {talentBuilds[selectedBuild] && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>{talentBuilds[selectedBuild].name}</Typography>
          <Typography variant="body2" paragraph>{talentBuilds[selectedBuild].description}</Typography>
          
          <Typography variant="h6" gutterBottom>Talents</Typography>
          <Grid container spacing={2}>
            {talentBuilds[selectedBuild].talents.map((talent, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper className="p-2 flex items-center">
                  <img src={talent.icon} alt={talent.name} className="w-12 h-12 mr-2" />
                  <div>
                    <Typography variant="subtitle1">{talent.name}</Typography>
                    <Typography variant="body2">{talent.description}</Typography>
                    <Typography variant="caption">{talent.points}/{talent.maxPoints}</Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom className="mt-4">Runes</Typography>
          <Grid container spacing={2}>
            {talentBuilds[selectedBuild].runes.map((rune, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper className="p-2 flex items-center">
                  <img src={rune.icon} alt={rune.name} className="w-12 h-12 mr-2" />
                  <div>
                    <Typography variant="subtitle1">{rune.name}</Typography>
                    <Typography variant="body2">{rune.description}</Typography>
                    <Typography variant="caption">Slot: {rune.slot}</Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default Talents;
