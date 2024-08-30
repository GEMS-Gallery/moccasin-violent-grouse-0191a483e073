import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Tooltip } from '@mui/material';
import { backend } from 'declarations/backend';

interface Talent {
  id: number;
  name: string;
  description: string;
  icon: string;
  tier: number;
  column: number;
  points: number;
  maxPoints: number;
  prerequisites: number[];
}

interface Rune {
  id: number;
  name: string;
  description: string;
  icon: string;
  slot: string;
}

interface TalentTree {
  talents: Talent[];
  runes: Rune[];
  maxTier: number;
  maxColumn: number;
}

const Talents: React.FC = () => {
  const [talentTree, setTalentTree] = useState<TalentTree | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalentTree = async () => {
      try {
        const result = await backend.getTalentTree();
        if ('ok' in result) {
          setTalentTree(result.ok);
        } else {
          throw new Error(result.err);
        }
      } catch (error) {
        console.error('Error fetching talent tree:', error);
        setError('Failed to load talent tree. Please try again later.');
      }
    };

    fetchTalentTree();
  }, []);

  const handleTalentClick = async (talent: Talent) => {
    if (!talentTree) return;

    const canAllocate = talent.points < talent.maxPoints && 
                        talent.tier <= Math.floor(totalPoints / 5) + 1 &&
                        talent.prerequisites.every(preReqId => 
                          talentTree.talents.find(t => t.id === preReqId)?.points === 
                          talentTree.talents.find(t => t.id === preReqId)?.maxPoints
                        );

    if (canAllocate) {
      try {
        const result = await backend.updateTalentPoints(talent.id, talent.points + 1);
        if ('ok' in result) {
          const updatedTalents = talentTree.talents.map(t => 
            t.id === talent.id ? { ...t, points: t.points + 1 } : t
          );
          setTalentTree({ ...talentTree, talents: updatedTalents });
          setTotalPoints(totalPoints + 1);
        } else {
          throw new Error(result.err);
        }
      } catch (error) {
        console.error('Error updating talent points:', error);
        setError('Failed to update talent points. Please try again.');
      }
    }
  };

  const renderTalentTree = () => {
    if (!talentTree) return null;

    const grid = [];
    for (let tier = 1; tier <= talentTree.maxTier; tier++) {
      const row = [];
      for (let column = 1; column <= talentTree.maxColumn; column++) {
        const talent = talentTree.talents.find(t => t.tier === tier && t.column === column);
        if (talent) {
          row.push(
            <Tooltip
              key={talent.id}
              title={
                <React.Fragment>
                  <Typography color="inherit">{talent.name}</Typography>
                  <Typography variant="body2">{talent.description}</Typography>
                  <Typography variant="caption">{`${talent.points}/${talent.maxPoints}`}</Typography>
                </React.Fragment>
              }
              arrow
            >
              <div
                className={`talent ${talent.points > 0 ? 'active' : ''}`}
                style={{ backgroundImage: `url(${talent.icon})` }}
                onClick={() => handleTalentClick(talent)}
                onMouseEnter={() => setSelectedTalent(talent)}
                onMouseLeave={() => setSelectedTalent(null)}
              >
                <div className="talent-points">{talent.points}</div>
              </div>
            </Tooltip>
          );
        } else {
          row.push(<div key={`empty-${tier}-${column}`} className="talent-placeholder"></div>);
        }
      }
      grid.push(<div key={`tier-${tier}`} className="talent-tier">{row}</div>);
    }
    return grid;
  };

  const renderRunes = () => {
    if (!talentTree) return null;

    return talentTree.runes.map(rune => (
      <Tooltip
        key={rune.id}
        title={
          <React.Fragment>
            <Typography color="inherit">{rune.name}</Typography>
            <Typography variant="body2">{rune.description}</Typography>
            <Typography variant="caption">{`Slot: ${rune.slot}`}</Typography>
          </React.Fragment>
        }
        arrow
      >
        <div
          className="rune"
          style={{ backgroundImage: `url(${rune.icon})` }}
        ></div>
      </Tooltip>
    ));
  };

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
        Talents and Runes
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Points: {totalPoints}
      </Typography>
      <div className="talent-tree">
        {renderTalentTree()}
      </div>
      <Typography variant="h5" component="h3" gutterBottom className="mt-4">
        Runes
      </Typography>
      <div className="runes-container flex space-x-4">
        {renderRunes()}
      </div>
    </Paper>
  );
};

export default Talents;
