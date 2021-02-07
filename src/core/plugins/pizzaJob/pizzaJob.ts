import * as alt from 'alt-server';
import { playerFuncs } from '../../server/extensions/Player';
import ChatController from '../../server/systems/chat';
import { Job } from '../../server/systems/job';
import { AnimationFlags } from '../../shared/flags/animation';
import { Permissions } from '../../shared/flags/permissions';
import JobEnums, { Objective } from '../../shared/interfaces/Job';
import { deepCloneObject } from '../../shared/utility/deepCopy';

const objectives: Array<Objective> = [
    {
        criteria: JobEnums.ObjectiveCriteria.NO_VEHICLE,
        type: JobEnums.ObjectiveType.WAYPOINT,
        description: 'Walk to the marker',
        pos: { x: -241.42921447753906, y: -713.875244140625, z: 33.49561309814453 },
        marker: {
            pos: { x: -241.42921447753906, y: -713.875244140625, z: 33.49561309814453 - 1 } as alt.Vector3,
            color: { r: 255, g: 255, b: 255, a: 100 },
            type: 1
        },
        blip: {
            pos: { x: -241.42921447753906, y: -713.875244140625, z: 33.49561309814453 },
            shortRange: false,
            sprite: 143,
            color: 26,
            text: 'Objective Point',
            scale: 0.1
        },
        particle: {
            pos: { x: -241.42921447753906, y: -713.875244140625, z: 33.49561309814453 },
            dict: 'core',
            name: 'blood_chopper',
            duration: 5000,
            scale: 5
        },
        range: 2
    },
    {
        criteria: JobEnums.ObjectiveCriteria.NO_VEHICLE,
        type: JobEnums.ObjectiveType.WAYPOINT,
        description: 'Walk to the next marker',
        pos: { x: -240.16085815429688, y: -724.7368774414062, z: 33.50142288208008 },
        marker: {
            pos: { x: -240.16085815429688, y: -724.7368774414062, z: 33.50142288208008 - 1 } as alt.Vector3,
            color: { r: 255, g: 255, b: 255, a: 100 },
            type: 1
        },
        blip: {
            pos: { x: -240.16085815429688, y: -724.7368774414062, z: 33.50142288208008 },
            shortRange: false,
            sprite: 143,
            color: 26,
            text: 'Objective Point',
            scale: 0.1
        },
        particle: {
            pos: { x: -240.16085815429688, y: -724.7368774414062, z: 33.50142288208008 },
            dict: 'core',
            name: 'exp_grd_plane_sp',
            duration: 5000,
            scale: 5
        },
        range: 2
    },
    {
        criteria: JobEnums.ObjectiveCriteria.NO_VEHICLE,
        type: JobEnums.ObjectiveType.WAYPOINT,
        description: 'Walk to the last marker',
        pos: { x: -231.2491912841797, y: -718.907958984375, z: 33.50018310546875 },
        marker: {
            pos: { x: -231.2491912841797, y: -718.907958984375, z: 33.50018310546875 - 1 } as alt.Vector3,
            color: { r: 255, g: 255, b: 255, a: 100 },
            type: 1
        },
        textLabel: {
            pos: { x: -231.2491912841797, y: -718.907958984375, z: 33.50018310546875 + 1 },
            data: `The last object!~n~~r~NICE!`
        },
        blip: {
            pos: { x: -231.2491912841797, y: -718.907958984375, z: 33.50018310546875 - 1 },
            shortRange: false,
            sprite: 143,
            color: 26,
            text: 'Objective Point',
            scale: 0.1
        },
        particle: {
            pos: { x: -231.2491912841797, y: -718.907958984375, z: 33.50018310546875 },
            dict: 'core',
            name: 'ent_dst_wood_splinter',
            duration: 5000,
            scale: 5
        },
        range: 2
    }
];

alt.on('hello:World', (player: alt.Player) => {
    playerFuncs.emit.message(player, 'Fuck you.');
});

alt.on('job:Pizza', (player: alt.Player) => {
    const jobInstance = new Job();
    jobInstance.loadObjectives(deepCloneObject(objectives));
    jobInstance.addPlayer(player);
});

ChatController.addCommand('pizza', '/pizza', Permissions.Admin, (player: alt.Player) => {
    alt.emit('job:Pizza', player);
});
