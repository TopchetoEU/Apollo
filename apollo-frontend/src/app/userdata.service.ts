import { Injectable } from '@angular/core';
import { Card, DbService } from './db.service';

export enum Medal {
    None = 0,
    Bronze = 1,
    Silver = 2,
    Gold = 3,
}
export interface MinigameUserdata {
    played: boolean;
    medal: Medal;
}
export interface MinigameUserdataWithId extends MinigameUserdata {
    cardId: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserdataService {
    getMinigameUserdata(id: string): MinigameUserdata | undefined {
        if (!localStorage['minigame-' + id]) {
            const a = {
                played: false,
                medal: Medal.None,
                cardId: id,
            };

            localStorage['minigame-' + id] = JSON.stringify(a);
            return a;
        }
        return JSON.parse(localStorage['minigame-' + id]);
    }
    getAllMinigameUserdata(): MinigameUserdata[] {
        const minigames: MinigameUserdata[] = [];

        for (const key in localStorage) {
            if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
                const minigameUserdata = JSON.parse(localStorage[key]);
                if (key.startsWith('minigame-')) minigames.push(minigameUserdata);
            }
        }

        return minigames;
    }

    getOwnedCardIds(): string[] {
        const cardsRaw = localStorage.cards;
        if (cardsRaw) return JSON.parse(cardsRaw);
        else {
            localStorage.cards = JSON.stringify([]);
            return [];
        }
    }
    getOwnedCards(): Card[] {
        return this.getOwnedCardIds().map(v => {
            return this.db.getCard(v);
        });
    }

    saveMinigameUserdata(id: string, userdata: MinigameUserdata): void {
        const saved = {...userdata, cardId: id};

        localStorage['minigame-' + id] = JSON.stringify(saved);
    }
    addCard(id: string): void {
        let saved = this.getOwnedCardIds();
        if (saved.includes(id)) throw new Error("Can't add a card that already exists!");
        saved = [...saved, id];

        localStorage.cards = JSON.stringify(saved);
    }

    constructor(
        private db: DbService,
    ) { }
}
