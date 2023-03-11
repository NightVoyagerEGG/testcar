import { InventoryType } from '@AthenaPlugins/core-inventory/shared/interfaces';
import { Character } from '@AthenaShared/interfaces/character';
import { StoredItem } from '@AthenaShared/interfaces/item';
import * as alt from 'alt-server';

export type AthenaPlayerEvents =
    | 'drop-item'
    | 'increased-play-time'
    | 'item-equipped'
    | 'item-unequipped'
    | 'pickup-item'
    | 'player-armour-set'
    | 'player-died'
    | 'player-disconnected'
    | 'player-entered-vehicle-as-driver'
    | 'player-health-set'
    | 'player-left-vehicle-seat'
    | 'player-pos-set'
    | 'player-skin-cleared'
    | 'player-skin-set'
    | 'player-uniform-cleared'
    | 'player-uniform-set'
    | 'player-weapon-unequipped'
    | 'respawned'
    | 'selected-character'
    | 'set-account-data'
    | 'spawned';

type PlayerCallbackArgs = (player: alt.Player, ...args: any[]) => void;

const playerEvents: Array<{ eventName: string; callback: ((player: alt.Player, ...args: any[]) => void) | Function }> =
    [];

/**
 * Usually called by internal functions. Can be used to manually trigger an Athena Event though.
 *
 * @param {AthenaPlayerEvents} eventName
 * @param {alt.Player} player
 * @memberof PlayerEvents
 */
export function trigger<CustomEvents = AthenaPlayerEvents>(
    eventName: CustomEvents,
    player: alt.Player,
    ...args: any[]
) {
    for (let i = 0; i < playerEvents.length; i++) {
        if (playerEvents[i].eventName !== eventName) {
            continue;
        }

        playerEvents[i].callback(player, ...args);
    }
}

// # =================================
// DEFINE ALL ON EVENTS HERE
// # =================================

/**
 * Called when a player item has changed from unequipped to equipped.
 *
 * @export
 * @param {'item-equipped'} eventName
 * @param {(player: alt.Player, slot: number, type: InventoryType) => void} callback
 */
export function on(
    eventName: 'item-equipped',
    callback: (player: alt.Player, slot: number, type: InventoryType) => void,
);

/**
 * Called when a player item has changed to unequipped
 *
 * @export
 * @param {'item-unequipped'} eventName
 * @param {(player: alt.Player, slot: number, type: InventoryType) => void} callback
 */
export function on(
    eventName: 'item-unequipped',
    callback: (player: alt.Player, slot: number, type: InventoryType) => void,
);

/**
 * Called when a player has died.
 *
 * @export
 * @param {'player-died'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'player-died', callback: (player: alt.Player) => void);

/**
 * Called when a player uniform has been set.
 * Check `characterDocument.data`
 *
 * @export
 * @param {'player-uniform-set'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'player-uniform-set', callback: (player: alt.Player) => void);

/**
 * Called when a player uniform has been cleared.
 * Uniform is set to undefined / null
 *
 * @export
 * @param {'player-uniform-cleared'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'player-uniform-cleared', callback: (player: alt.Player) => void);

/**
 * Called when a player has their model set to non-multiplayer models.
 *
 * @export
 * @param {'player-skin-set'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'player-skin-set', callback: (player: alt.Player) => void);

/**
 * Called when a player has their model cleared to a multiplayer model.
 *
 * @export
 * @param {'player-skin-cleared'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'player-skin-cleared', callback: (player: alt.Player) => void);

/**
 * Called when the internal safe health functions are invoked.
 * This is never called when `player.health` is modified
 *
 * @export
 * @param {'player-health-set'} eventName
 * @param {(player: alt.Player, oldValue: number) => void} callback
 */
export function on(eventName: 'player-health-set', callback: (player: alt.Player, oldValue: number) => void);

/**
 * Called when the internal safe armour functions are invoked.
 * This is never called when `player.armour` is modified.
 *
 * @export
 * @param {'player-armour-set'} eventName
 * @param {(player: alt.Player, oldValue: number) => void} callback
 */
export function on(eventName: 'player-armour-set', callback: (player: alt.Player, oldValue: number) => void);

/**
 * Called when the internal safe position functions are invoked.
 * This is never called when `player.pos` is modified.
 *
 * @export
 * @param {'player-pos-set'} eventName
 * @param {(player: alt.Player, oldValue: alt.IVector3) => void} callback
 */
export function on(eventName: 'player-pos-set', callback: (player: alt.Player, oldValue: alt.IVector3) => void);

/**
 * Called when playtime has increased slightly.
 *
 * @export
 * @param {'increased-play-time'} eventName
 * @param {(player: alt.Player, newHours: number) => void} callback
 */
export function on(eventName: 'increased-play-time', callback: (player: alt.Player, newHours: number) => void);

/**
 * Called when a player has dropped an item.
 *
 * @export
 * @param {'drop-item'} eventName
 * @param {(player: alt.Player, storedItem: StoredItem) => void} callback
 */
export function on(eventName: 'drop-item', callback: (player: alt.Player, storedItem: StoredItem) => void);

/**
 * Called when a player picks up an item.
 * The `_id` is a reference to the item in the database; or the item in the ItemDrops system.
 *
 * @export
 * @param {'pickup-item'} eventName
 * @param {(player: alt.Player, _id: string) => void} callback
 */
export function on(eventName: 'pickup-item', callback: (player: alt.Player, _id: string) => void);

/**
 * Called when a player selects a character
 *
 * @export
 * @param {'selected-character'} eventName
 * @param {(player: alt.Player, _id: string) => void} callback
 */
export function on(eventName: 'selected-character', callback: (player: alt.Player) => void);

/**
 * Called when a player has been respawned by internal functions.
 *
 * @export
 * @param {'respawned'} eventName
 * @param {(player: alt.Player) => void} callback
 */
export function on(eventName: 'respawned', callback: (player: alt.Player) => void);

/**
 * Called when a player has left a vehicle seat.
 *
 * @export
 * @param {'player-left-vehicle-seat'} eventName
 * @param {(player: alt.Player, seat: number) => void} callback
 */
export function on(
    eventName: 'player-left-vehicle-seat',
    callback: (player: alt.Player, vehicle: alt.Vehicle, seat: number) => void,
);

/**
 * Called when a player enters a vehicle as a driver.
 *
 * @export
 * @param {'player-entered-vehicle-as-driver'} eventName
 * @param {(player: alt.Player, vehicle: alt.Vehicle) => void} callback
 */
export function on(
    eventName: 'player-entered-vehicle-as-driver',
    callback: (player: alt.Player, vehicle: alt.Vehicle) => void,
);

/**
 * Triggers when a player id is unbound from a document.
 * Formally known as a disconnect event.
 * PLAYER WILL BE UNDEFINED, DO NOT USE VARIABLE
 *
 * @export
 * @template T
 * @param {'player-disconnected'} eventName
 * @param {((player: alt.Player, id: number, document: Character | T) => void)} callback
 */
export function on<T>(
    eventName: 'player-disconnected',
    callback: (player: alt.Player, id: number, document: Character | T) => void,
);

/**
 * Triggers when a player unequips a weapon.
 *
 * @export
 * @template T
 * @param {'player-weapon-unequipped'} eventName
 * @param {(player: alt.Player, slot: number, type: InventoryType) => void} callback
 */
export function on<T>(
    eventName: 'player-weapon-unequipped',
    callback: (player: alt.Player, slot: number, type: InventoryType) => void,
);

/**
 * Trigger a callback specific to Athena Player Events.
 * @param {AthenaPlayerEvents} eventName
 * @param {(player: alt.Player) => void} callback
 * @memberof PlayerEvents
 */
export function on<CustomEvents = AthenaPlayerEvents>(
    eventName: CustomEvents,
    callback: PlayerCallbackArgs | Function,
) {
    playerEvents.push({ eventName: String(eventName), callback });
}
