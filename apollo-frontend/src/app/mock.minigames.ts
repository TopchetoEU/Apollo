import { Saved, Minigame } from "./db.service";

export const mock_minigames: Saved<Minigame>[] = [
    {
        id: '0',
        el: {
            name: 'ConveyorBin',
            url: '/minigames/conveyor-belt',
        }
    },
    {
        id: '1',
        el: {
            name: 'BioTrivia',
            url: '/minigames/biotrivia',
        }
    }
];
