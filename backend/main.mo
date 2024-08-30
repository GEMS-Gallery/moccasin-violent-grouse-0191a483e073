import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

actor {
  type Talent = {
    name: Text;
    description: Text;
    icon: Text;
    tier: Nat;
    column: Nat;
    points: Nat;
    maxPoints: Nat;
  };

  type Rune = {
    name: Text;
    description: Text;
    icon: Text;
    slot: Text;
  };

  type TalentBuild = {
    name: Text;
    description: Text;
    talents: [Talent];
    runes: [Rune];
  };

  type GearItem = {
    name: Text;
    slot: Text;
    stats: Text;
    enchant: ?Text;
    source: ?Text;
  };

  type Stat = {
    name: Text;
    value: Nat;
    description: ?Text;
  };

  stable var talentBuilds: [TalentBuild] = [
    {
      name = "Standard Elemental";
      description = "A balanced build for general PvE content";
      talents = [
        { name = "Convection"; description = "Reduces the mana cost of your Shock spells by 10%."; icon = "spell_nature_wispsplode.jpg"; tier = 1; column = 2; points = 2; maxPoints = 5 },
        { name = "Concussion"; description = "Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 5%."; icon = "spell_fire_thorns.jpg"; tier = 1; column = 3; points = 5; maxPoints = 5 },
        { name = "Call of Thunder"; description = "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by 5%."; icon = "spell_nature_callstorm.jpg"; tier = 3; column = 3; points = 5; maxPoints = 5 }
      ];
      runes = [
        { name = "Rune of Lashing Flames"; description = "Your Flame Shock damage over time effect now stacks up to 2 times on a single target."; icon = "rune_lashing_flames.jpg"; slot = "Legs" },
        { name = "Rune of Elemental Force"; description = "Lightning Bolt has a 15% chance to make your next Chain Lightning instant cast and cost no mana."; icon = "rune_elemental_force.jpg"; slot = "Chest" }
      ];
    },
    {
      name = "AoE Focused";
      description = "Optimized for multi-target encounters";
      talents = [
        { name = "Storm Reach"; description = "Increases the range of your Lightning Bolt and Chain Lightning spells by 5 yards."; icon = "spell_nature_stormreach.jpg"; tier = 4; column = 1; points = 2; maxPoints = 2 },
        { name = "Elemental Fury"; description = "Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%."; icon = "spell_fire_volcano.jpg"; tier = 4; column = 4; points = 5; maxPoints = 5 }
      ];
      runes = [
        { name = "Rune of Forked Lightning"; description = "Chain Lightning now bounces to 2 additional targets."; icon = "rune_forked_lightning.jpg"; slot = "Hands" }
      ];
    }
  ];

  stable var gearRecommendations: [GearItem] = [
    { name = "Stormcaller's Helm"; slot = "Head"; stats = "+20 Intellect, +15 Spell Power"; enchant = ?"Arcanum of Focus"; source = ?"Drops from Onyxia" },
    { name = "Thunderheart Chestguard"; slot = "Chest"; stats = "+25 Intellect, +20 Spell Power"; enchant = ?"Greater Stats"; source = ?"Crafted by Leatherworking" }
  ];

  stable var statPriority: [Stat] = [
    { name = "Spell Power"; value = 1; description = ?"Increases the power of your spells" },
    { name = "Intellect"; value = 2; description = ?"Increases your mana pool and spell critical strike chance" },
    { name = "Critical Strike Rating"; value = 3; description = ?"Increases your chance to critically hit with spells" },
    { name = "Haste Rating"; value = 4; description = ?"Decreases the cast time of your spells" },
    { name = "Spirit"; value = 5; description = ?"Increases your mana regeneration" }
  ];

  public query func getTalentBuilds() : async [TalentBuild] {
    talentBuilds
  };

  public query func getGearRecommendations() : async [GearItem] {
    gearRecommendations
  };

  public query func getStatPriority() : async [Stat] {
    statPriority
  };

  public func addTalentBuild(build: TalentBuild) : async () {
    talentBuilds := Array.append(talentBuilds, [build]);
  };

  public func addGearItem(item: GearItem) : async () {
    gearRecommendations := Array.append(gearRecommendations, [item]);
  };

  public func updateStatPriority(stats: [Stat]) : async () {
    statPriority := stats;
  };
}
