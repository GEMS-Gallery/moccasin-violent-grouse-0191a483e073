import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface GearItem {
  'source' : [] | [string],
  'name' : string,
  'slot' : string,
  'stats' : string,
  'enchant' : [] | [string],
}
export interface Rune {
  'icon' : string,
  'name' : string,
  'slot' : string,
  'description' : string,
}
export interface Stat {
  'value' : bigint,
  'name' : string,
  'description' : [] | [string],
}
export interface Talent {
  'maxPoints' : bigint,
  'icon' : string,
  'name' : string,
  'tier' : bigint,
  'description' : string,
  'column' : bigint,
  'points' : bigint,
}
export interface TalentBuild {
  'talents' : Array<Talent>,
  'name' : string,
  'description' : string,
  'runes' : Array<Rune>,
}
export interface _SERVICE {
  'addGearItem' : ActorMethod<[GearItem], undefined>,
  'addTalentBuild' : ActorMethod<[TalentBuild], undefined>,
  'getGearRecommendations' : ActorMethod<[], Array<GearItem>>,
  'getStatPriority' : ActorMethod<[], Array<Stat>>,
  'getTalentBuilds' : ActorMethod<[], Array<TalentBuild>>,
  'updateStatPriority' : ActorMethod<[Array<Stat>], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
