import { Injectable } from '@angular/core';
import { mock_card_types } from './mock.card_types';
import { mock_minigames } from './mock.minigames';
import { mock_questions } from './mock.questions';

export interface Minigame {
    name: string;
    url: string;
    comingSoon?: boolean;
}

export interface CardParagraph {
    heading: string;
    content: string;
}
export interface Card {
    info: CardParagraph[];
    imageUrl: string;
    name: string;
    types: Array<"endangered" | "normal" | "recycle">;
}
export interface Answer {
    choises: string[];
    correctChoise: string;
}
export interface Question {
    category: string;
    question: string;
    photoUrlsAbove?: string[];
    answer: Answer;
}

export interface Saved<T> {
    id: string;
    el: T;
}
@Injectable({
    providedIn: 'root'
})
export class DbService {
    private mock_minigames: Saved<Minigame>[] = mock_minigames;
    private mock_card_types: Saved<Card>[] = mock_card_types;
    private mock_questions: Saved<Question>[] = mock_questions;

    private getRandomEls<T>(array: T[], n: number): T[] {
        const result: T[] = [];

        for (let i = 0; i < n; i++) {
            const index = Math.floor(Math.random() * array.length);
            result.push(array.splice(index, 1)[0]);
        }

        array.push(...result);

        return result;
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
    getRandomCardId(endangeredBias: number): string {
        const normal = this.getAllCards().filter(v => !v.el.types.includes('endangered'));
        const endangered = this.getAllCards().filter(v => v.el.types.includes('endangered'));

        if (Math.random() < endangeredBias) {
            return this.getRandomEls(endangered, 1)[0].id;
        }
        else {
            return this.getRandomEls(normal, 1)[0].id;
        }
    }

    getRandomQuestions(n: number): Question[] {
        return this.getRandomEls(this.mock_questions
            .map(v => v.el), n);
    }
    constructor() { }
}
