export const idlFactory = ({ IDL }) => {
  const GearItem = IDL.Record({
    'source' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'slot' : IDL.Text,
    'stats' : IDL.Text,
    'enchant' : IDL.Opt(IDL.Text),
  });
  const Rune = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'slot' : IDL.Text,
    'description' : IDL.Text,
    'effect' : IDL.Opt(IDL.Text),
  });
  const Talent = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'tier' : IDL.Nat,
    'description' : IDL.Opt(IDL.Text),
    'column' : IDL.Nat,
  });
  const Stat = IDL.Record({
    'value' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addGearItem' : IDL.Func([GearItem], [], []),
    'addRune' : IDL.Func([Rune], [], []),
    'addTalent' : IDL.Func([Talent], [], []),
    'getGearRecommendations' : IDL.Func([], [IDL.Vec(GearItem)], ['query']),
    'getRunes' : IDL.Func([], [IDL.Vec(Rune)], ['query']),
    'getStatPriority' : IDL.Func([], [IDL.Vec(Stat)], ['query']),
    'getTalentTree' : IDL.Func([], [IDL.Vec(Talent)], ['query']),
    'updateStatPriority' : IDL.Func([IDL.Vec(Stat)], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
