import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Answer, DbService, Question } from '../db.service';


@Component({
    selector: 'app-minigame-biotrivia',
    templateUrl: './minigame-biotrivia.component.html',
    styleUrls: ['./minigame-biotrivia.component.scss']
})
export class MinigameBiotriviaComponent implements OnInit {
    @ViewChildren('startDialog') startingElementRef;
    @ViewChildren('ongoingDialog') ongoingElementRef;

    guessedQuestions = 0;
    stage: 'starting' | 'starting-ongoing' | 'ongoing' | 'ended' = 'starting';

    questions: Question[];

    currQuestionN = 0;
    currQuestion: Question;
    currAnswers: string[];

    selected: string;

    constructor(
        private zone: NgZone,
        private db: DbService
    ) { }

    ngOnInit(): void {
    }

    test() {
        console.log('sdfgui s');
    }

    animateElements(el1: HTMLElement, el2: HTMLElement): Observable<void> {
        const a = new Subject<void>();
        el1.style.position = 'absolute';
        el1.animate([
            {
                transform: 'translateX(0)',
                opacity: 1,
            },
            {
                transform: 'translateX(-100vh)',
                opacity: 0,
            },
        ], {
            duration: 200,
            easing: 'ease-in',
        }).onfinish = () => {
            el1.style.opacity = '0';
        };
        el2.animate([
            {
                transform: 'translateX(100vh)',
                opacity: 0,
            },
            {
                transform: 'translateX(0)',
                opacity: 1,
            },
        ], {
            duration: 200,
            easing: 'ease-out',
        }).onfinish = () => {
            el2.style.opacity = '1';
            a.next();
        };
        return a;
    }

    loadQuestion(i: number): void {
        this.currQuestion = this.questions[i];
        this.currAnswers = this.shuffle(this.questions[i].answer.choises);
    }
    loadNextQuestion(): void {
        this.loadQuestion(this.currQuestionN++);
    }

    startGame(): void {
        if (this.stage !== 'starting') return;

        const startingEl = this.startingElementRef.first.nativeElement as HTMLElement;
        startingEl.style.position = 'absolute';

        this.stage = 'starting-ongoing';
        this.questions = this.db.getRandomQuestions(5, this.db.getRandomCategory());
        this.loadNextQuestion();

        setTimeout(() => {
            const ongoingEl = this.ongoingElementRef.first.nativeElement as HTMLElement;

            console.log(this.questions);

            // tslint:disable-next-line: deprecation
            this.animateElements(startingEl, ongoingEl).subscribe(() => {
                this.stage = 'ongoing';
            });
        }, 20);
    }

    shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
