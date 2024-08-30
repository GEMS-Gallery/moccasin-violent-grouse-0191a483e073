export const idlFactory = ({ IDL }) => {
  const GearItem = IDL.Record({
    'source' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'slot' : IDL.Text,
    'stats' : IDL.Text,
    'enchant' : IDL.Opt(IDL.Text),
  });
  const Talent = IDL.Record({
    'maxPoints' : IDL.Nat,
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'tier' : IDL.Nat,
    'description' : IDL.Text,
    'column' : IDL.Nat,
    'points' : IDL.Nat,
  });
  const Rune = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'slot' : IDL.Text,
    'description' : IDL.Text,
  });
  const TalentBuild = IDL.Record({
    'talents' : IDL.Vec(Talent),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'runes' : IDL.Vec(Rune),
  });
  const Stat = IDL.Record({
    'value' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addGearItem' : IDL.Func([GearItem], [], []),
    'addTalentBuild' : IDL.Func([TalentBuild], [], []),
    'getGearRecommendations' : IDL.Func([], [IDL.Vec(GearItem)], ['query']),
    'getStatPriority' : IDL.Func([], [IDL.Vec(Stat)], ['query']),
    'getTalentBuilds' : IDL.Func([], [IDL.Vec(TalentBuild)], ['query']),
    'updateStatPriority' : IDL.Func([IDL.Vec(Stat)], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
