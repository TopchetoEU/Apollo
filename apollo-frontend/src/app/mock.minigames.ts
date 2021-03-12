import { Saved, Minigame } from "./db.service";

export const mock_minigames: Saved<Minigame>[] = [
    {
        id: '0',
        el: {
            name: 'Рециклиране',
            url: '/minigames/conveyor-belt',
            comingSoon: true,
        }
    },
    {
        id: '0',
        el: {
            name: 'BioTrivia',
            url: '/minigames/biotrivia',
        }
    }
];
