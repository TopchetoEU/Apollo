import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subject } from 'rxjs';


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

    constructor(
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
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
            a.next();
        };
        return a;
    }

    startGame(): void {
        if (this.stage !== 'starting') return;
        console.log(this.ongoingElementRef);

        const startingEl = this.startingElementRef.first.nativeElement as HTMLElement;
        startingEl.style.position = 'absolute';

        this.stage = 'starting-ongoing';

        setTimeout(() => {
            const ongoingEl = this.ongoingElementRef.first.nativeElement as HTMLElement;

            // tslint:disable-next-line: deprecation
            this.animateElements(startingEl, ongoingEl).subscribe(() => {
                this.stage = 'ongoing';
            });
        }, 10);
    }
}
