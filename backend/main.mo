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
    description: ?Text;
    icon: Text;
    tier: Nat;
    column: Nat;
  };

  type Rune = {
    name: Text;
    description: Text;
    effect: ?Text;
    icon: Text;
    slot: Text;
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

  stable var talentTree: [Talent] = [
    { name = "Earth Shock"; description = ?"Instantly shocks the target with earthen energy"; icon = "earth_shock.png"; tier = 1; column = 2 },
    { name = "Lightning Bolt"; description = ?"Hurls a bolt of lightning at the target"; icon = "lightning_bolt.png"; tier = 1; column = 3 },
    { name = "Elemental Mastery"; description = ?"Reduces the mana cost of your shock spells"; icon = "elemental_mastery.png"; tier = 3; column = 2 }
  ];

  stable var runes: [Rune] = [
    { name = "Rune of Thunderstorm"; description = "Enhances your Lightning Bolt"; effect = ?"Increases Lightning Bolt damage by 10%"; icon = "rune_thunderstorm.png"; slot = "Chest" },
    { name = "Rune of Seismic Activity"; description = "Empowers your Earth Shock"; effect = ?"Earth Shock has a chance to stun the target"; icon = "rune_seismic.png"; slot = "Legs" }
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

  public query func getTalentTree() : async [Talent] {
    talentTree
  };

  public query func getRunes() : async [Rune] {
    runes
  };

  public query func getGearRecommendations() : async [GearItem] {
    gearRecommendations
  };

  public query func getStatPriority() : async [Stat] {
    statPriority
  };

  public func addTalent(talent: Talent) : async () {
    talentTree := Array.append(talentTree, [talent]);
  };

  public func addRune(rune: Rune) : async () {
    runes := Array.append(runes, [rune]);
  };

  public func addGearItem(item: GearItem) : async () {
    gearRecommendations := Array.append(gearRecommendations, [item]);
  };

  public func updateStatPriority(stats: [Stat]) : async () {
    statPriority := stats;
  };
}
