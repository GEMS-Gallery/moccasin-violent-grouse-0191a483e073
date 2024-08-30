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
  'effect' : [] | [string],
}
export interface Stat {
  'value' : bigint,
  'name' : string,
  'description' : [] | [string],
}
export interface Talent {
  'icon' : string,
  'name' : string,
  'tier' : bigint,
  'description' : [] | [string],
  'column' : bigint,
}
export interface _SERVICE {
  'addGearItem' : ActorMethod<[GearItem], undefined>,
  'addRune' : ActorMethod<[Rune], undefined>,
  'addTalent' : ActorMethod<[Talent], undefined>,
  'getGearRecommendations' : ActorMethod<[], Array<GearItem>>,
  'getRunes' : ActorMethod<[], Array<Rune>>,
  'getStatPriority' : ActorMethod<[], Array<Stat>>,
  'getTalentTree' : ActorMethod<[], Array<Talent>>,
  'updateStatPriority' : ActorMethod<[Array<Stat>], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
