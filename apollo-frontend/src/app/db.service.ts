import { Injectable } from '@angular/core';

export interface Minigame {
    name: string;
    url: string;
}

export interface CardParagraph {
    heading: string;
    content: string;
}
export interface Card {
    info: CardParagraph[];
    imageUrl: string;
    name: string;
    types: Array<"endangered" | "normal">;
}
export interface Saved<T> {
    id: string;
    el: T;
}

@Injectable({
    providedIn: 'root'
})
export class DbService {
    private mock_minigames: Saved<Minigame>[] = [
        {
            id: '0',
            el: {
                name: 'test',
                url: 'none',
            }
        },
        {
            id: '1',
            el: {
                name: 'test2',
                url: 'none',
            }
        }
    ];
    private mock_card_types: Saved<Card>[];

    private getRandomEl<T>(array: T[]): T {
        const index = Math.floor(Math.random() * array.length);

        return array[index];
    }

    getAllMinigames(): Saved<Minigame>[] {
        return this.mock_minigames;
    }
    getAllCards(): Saved<Card>[] {
        return this.mock_card_types;
    }

    getMinigame(id: string): Minigame {
        const index = this.mock_minigames.findIndex(v => v.id === id);

        if (index < 0) return null;
        else return this.mock_minigames[index].el;
    }
    getCard(id: string): Card {
        const index = this.mock_card_types.findIndex(v => v.id === id);

        if (index < 0) return null;
        else return this.mock_card_types[index].el;
    }

    constructor() { }
}
