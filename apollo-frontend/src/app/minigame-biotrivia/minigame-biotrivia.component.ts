import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { IgxRadioComponent, IgxRadioGroupDirective } from 'igniteui-angular';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Answer, Card, DbService, Question, Saved } from '../db.service';
import { Medal, UserdataService } from '../userdata.service';


@Component({
    selector: 'app-minigame-biotrivia',
    templateUrl: './minigame-biotrivia.component.html',
    styleUrls: ['./minigame-biotrivia.component.scss']
})
export class MinigameBiotriviaComponent implements OnInit {
    @ViewChildren('startDialog') startingElementRef;
    @ViewChildren('ongoingDialog') ongoingElementRef;
    @ViewChildren('endDialog') endingElementRef;

    stage: 'starting' | 'starting-ongoing' | 'ongoing' | 'ongoing-ended' | 'ended' = 'starting';

    questions: Question[];

    displayError = false;
    player: HTMLAudioElement;

    guessedQuestions = 0;
    currQuestionN = 0;
    currQuestion: Question;
    currAnswers: string[];

    wonCard: Card = null;

    answers: Array<{ question: Question, answer: string }> = [];

    selectedAnswer = '';
    isAnswered(): boolean {
        return this.selectedAnswer !== '';
    }

    constructor(
        private db: DbService,
        private userdata: UserdataService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.router.events.pipe(
            filter((e: any) => e instanceof NavigationStart),
            // tslint:disable-next-line: deprecation
        ).subscribe((e: NavigationStart) => {
            console.log(e);
            this.player.pause();
            this.player.remove();
        });
    }

    endGame(): void {
        this.stage = 'ongoing-ended';
        this.player.pause();
        this.player.remove();

        const successRate = (this.guessedQuestions) / this.questions.length;

        if (successRate > 0.5) {
            const owned = this.userdata.getOwnedCardIds();

            let newCard = null;

            do {
                newCard = this.db.getRandomCardId(successRate - .5);
            } while (owned.includes(newCard));

            this.userdata.addCard(newCard);
            this.wonCard = this.db.getCard(newCard);
        }

        const id = '1';
        const data = this.userdata.getMinigameUserdata(id);

        let medal = Medal.None;

        if (successRate > .5) medal = Medal.Bronze;
        if (successRate > .75) medal = Medal.Silver;
        if (successRate > .9) medal = Medal.Gold;

        if (data.medal < medal) data.medal = medal;
        data.played = true;

        this.userdata.saveMinigameUserdata(id, data);

        setTimeout(() => {
            this.endingElementRef.first.nativeElement.style.opacity = 0;
            this.animateElements(
                this.ongoingElementRef.first.nativeElement,
                this.endingElementRef.first.nativeElement
                // tslint:disable-next-line: deprecation
            ).subscribe(() => {
                this.stage = 'ended';
            });
        }, 10);
    }

    submitAnswer(): void {
        if (!this.isAnswered()) {
            this.displayError = true;
            return;
        }
        this.ongoingElementRef.first.nativeElement.style.position = 'absolute';

        if (this.selectedAnswer === this.currQuestion.answer.correctChoise) this.guessedQuestions++;

        this.answers.push({
            answer: this.selectedAnswer,
            question: this.currQuestion,
        });

        if (this.currQuestionN >= this.questions.length) {
            this.endGame();
            return;
        }

        this.displayError = false;
        this.selectedAnswer = '';
        this.loadNextQuestion();
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

        this.player = document.createElement('audio');

        this.player.src = '/assets/sound/music/biotrivia.wav';
        this.player.loop = true;
        this.player.play();

        const startingEl = this.startingElementRef.first.nativeElement as HTMLElement;
        startingEl.style.position = 'absolute';

        this.stage = 'starting-ongoing';
        this.questions = this.db.getRandomQuestions(5);
        this.loadNextQuestion();

        setTimeout(() => {
            const ongoingEl = this.ongoingElementRef.first.nativeElement as HTMLElement;

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

    getIncorrectAnswers(): { question: Question, answer: string, index: number }[] {
        return this.answers.map((v, i) => {
            return { ...v, index: i + 1 };
        }).filter((v) => v.answer !== v.question.answer.correctChoise);
    }

    restartGame(): void {
        if (this.stage !== 'ended') return;

        const endingEl = this.endingElementRef.first.nativeElement as HTMLElement;
        endingEl.style.position = 'absolute';

        this.stage = 'ongoing-ended';

        this.questions = this.db.getRandomQuestions(5);

        this.displayError = false;

        this.guessedQuestions = 0;
        this.currQuestionN = 0;
        this.answers = [];

        this.selectedAnswer = '';

        this.wonCard = null;

        this.loadNextQuestion();

        setTimeout(() => {
            const ongoingEl = this.ongoingElementRef.first.nativeElement as HTMLElement;

            // tslint:disable-next-line: deprecation
            this.animateElements(endingEl, ongoingEl).subscribe(() => {
                this.stage = 'ongoing';
                this.player = document.createElement('audio');

                this.player.src = '/assets/sound/music/biotrivia.wav';
                this.player.loop = true;
                this.player.play();
            });
        }, 20);
    }
}
