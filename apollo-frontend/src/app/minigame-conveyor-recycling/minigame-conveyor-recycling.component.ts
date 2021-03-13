import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Card, DbService, Saved } from '../db.service';
import { Medal, UserdataService } from '../userdata.service';

class Rect {
    public top: number;
    public left: number;
    public bottom: number;
    public right: number;

    private checkPointInRect(x: number, y: number, rect: Rect): boolean {
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }
    private checkRectInRect(a: Rect, b: Rect): boolean {
        return this.checkPointInRect(a.left, a.top, b) ||
            this.checkPointInRect(a.right, a.top, b) ||
            this.checkPointInRect(a.left, a.bottom, b) ||
            this.checkPointInRect(a.right, a.bottom, b);
    }

    public collidesWith(rect: Rect): boolean {
        return this.checkRectInRect(this, rect) || this.checkRectInRect(rect, this);
    }

    constructor(domRect: DOMRect | number, left?: number, right?: number, bottom?: number) {
        if (typeof domRect === 'number') {
            this.top = domRect;
            this.left = left;
            this.right = right;
            this.bottom = bottom;
        }
        else {
            this.top = domRect.top;
            this.left = domRect.left;
            this.right = domRect.right;
            this.bottom = domRect.bottom;
        }
    }
}

class Conveyor {
    public element: HTMLElement;

    public speed: number;


    public checkCollision(rect: Rect): boolean {
        const a = new Rect(this.element.getBoundingClientRect());
        const b = rect;

        return a.collidesWith(b);
    }
    public getUpVelocity(rect: Rect): number {
        return this.element.getBoundingClientRect().top - rect.bottom;
    }
}
class Bin {
    public acceptedTypes: string[];
    public element: HTMLElement;
    public checkTrashColission(trash: Trash): boolean {
        return trash.rect.collidesWith(new Rect(this.element.getBoundingClientRect()));
    }
    public correctTrash(trash: Trash): boolean {
        return this.acceptedTypes.includes(trash.type);
    }
}

class Trash {
    public imageUrl: string;
    public type: string;
    public velX: number;
    public velY: number;

    public element: HTMLElement;

    public thrownOut = new EventEmitter<boolean>();
    public dropped = new EventEmitter();

    public rect: Rect;

    public update(gravity: number, friction: number, conveyor: Conveyor, ...bins: Bin[]): { x: number, y: number, bin?: Bin } {
        let x;
        let y;

        x = this.rect.left;
        y = this.rect.top;

        this.velY += gravity;
        y += this.velY;

        this.rect.top += this.velY;
        this.rect.bottom += this.velY;

        if (conveyor.checkCollision(this.rect)) {
            const velCorrection = conveyor.getUpVelocity(this.rect);
            this.velY = 0;
            y += velCorrection;
            this.velX = conveyor.speed;
            this.rect.top -= this.velY;
            this.rect.bottom -= this.velY;
        }
        else if (Math.abs(this.velX) > 0) {
            this.velX = Math.sign(this.velX) * (Math.abs(this.velX) - friction);
        }

        const bin = bins.find(v => v.checkTrashColission(this));
        x += this.velX;

        const offsetX = -this.rect.left + x;
        const offsetY = -this.rect.top + y;

        this.rect.left += offsetX;
        this.rect.top += offsetY;
        this.rect.right += offsetX;
        this.rect.bottom += offsetY;

        this.element.style.top = Math.floor(y / 2) * 2 + 'px';
        this.element.style.left = Math.floor(x / 2) * 2 + 'px';

        return { x, y, bin };
    }
}

@Component({
    selector: 'app-minigame-conveyor-recycling',
    templateUrl: './minigame-conveyor-recycling.component.html',
    styleUrls: ['./minigame-conveyor-recycling.component.scss']
})
export class MinigameConveyorRecyclingComponent implements AfterViewInit, OnInit {
    conveyorFrame = 1;
    mainLoopID: number;
    timeCounterID: number;
    trashTypes: string[] = ['metal-plastic', 'glass', 'paper', 'other'];
    nextId = 0;

    ended = false;

    throwOutSounds: HTMLAudioElement[] = [];
    backgroundMusic: HTMLAudioElement;

    trashSpeed = 1000;
    simulationSpeed = 10;
    friction = 5;
    gravitation = 9;

    suspended = true;

    trashOffset = 0;

    bins: Bin[];
    conveyor: Conveyor;
    trashes: Saved<Trash>[] = [];
    binWidth = 110;
    milliseconds = 0;

    won = false;
    wonCard: Card = {
        imageUrl: '',
        info: [],
        name: 'test',
        types: ['endangered'],
    };

    timeMax = 1;
    time = 0;

    points = 0;
    mistakes = 0;

    binsAcceptedTypes: string[][] = [
        [ 'paper' ],
        [ 'glass' ],
        [ 'metal-plastic' ],
        [ 'other' ],
    ];

    @ViewChildren('conveyor') conveyorElement;
    @ViewChildren('bin') binElements;
    @ViewChild('endDialog') endDialog;

    initSound(url: string): HTMLAudioElement {
        const el = document.createElement('audio');
        el.src = url;

        return el;
    }
    clearSound(sound: HTMLAudioElement): void {
        document.body.append(sound);
        sound.remove();
    }

    keydownListener = (e) => {
        if (!this.suspended) {
            const code = e.keyCode as number;
            if (code === 65) this.trashOffset--;
            if (code === 68) this.trashOffset++;

            if (this.trashOffset < 0) this.trashOffset = 0;
            if (this.trashOffset >= this.bins.length) this.trashOffset = this.bins.length - 1;
        }
    }

    constructor(
        private zone: NgZone,
        private router: Router,
        private element: ElementRef,
        private db: DbService,
        private userdata: UserdataService,
    ) { }

    showPoint(points: number, x: number, y: number): void {
        const el = document.createElement('span');
        el.style.fontWeight = '600';
        el.style.fontSize = '1.5em';
        el.style.position = 'fixed';
        el.style.top = y + 'px';
        el.style.left = x + 'px';
        if (points < 0) el.style.color = 'red';
        if (points > 0) el.style.color = 'green';

        if (points > 0) el.innerText = '+';
        el.innerText += points.toString();

        this.element.nativeElement.append(el);

        el.animate([
            {
                transform: 'translateY(0)',
                opacity: 1,
            },
            {
                transform: 'translateY(-100px)',
                opacity: 0
            }
        ], {
            duration: 500,
        }).onfinish = () => {
            el.remove();
        };
    }

    getTimerText(): string {
        const time = this.timeMax - this.time;
        const minutes = Math.floor(time / 60).toString();
        let seconds = Math.floor(time % 60).toString();

        if (seconds.length === 1) seconds = "0" + seconds;

        return `Остават: ${minutes}:${seconds}`;
    }

    spawnTrash(): void {
        const trash = new Trash();
        const element = document.createElement('img');
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.style.userSelect = 'none';

        trash.velX = 0;
        trash.velY = 0;

        trash.type = this.getRandomType();
        trash.imageUrl = `/assets/images/conveyor-belt/${trash.type}-${Math.floor(Math.random() * 3) + 1}.png`;

        element.src = trash.imageUrl;

        element.decode().then(() => {
            trash.element = element;

            this.element.nativeElement.append(element);
            trash.rect = new Rect(0, 0, element.width, element.height);

            this.trashes.push({ id: (this.nextId++).toString(), el: trash });
        });
    }
    updateTrash(trash: Saved<Trash>, i: number): void {
        const newPos = trash.el.update(
            this.gravitation / (1000 / this.simulationSpeed),
            this.friction / (1000 / this.simulationSpeed),
            this.conveyor, ...this.bins
        );
        if (newPos.y > document.body.getBoundingClientRect().bottom) {
            trash.el.element.remove();
            this.trashes.splice(i, 1);
        }

        if (newPos.bin) {
            trash.el.element.remove();
            this.trashes.splice(i, 1);

            this.throwOutSounds[Math.floor(Math.random() * 3)].play();

            const pointX = (trash.el.rect.left + trash.el.rect.right) / 2;
            const pointY = trash.el.rect.bottom;

            if (newPos.bin.acceptedTypes.includes(trash.el.type)) {
                this.points++;
                this.showPoint(1, pointX, pointY);
            }
            else {
                this.points--;
                this.mistakes++;
                this.showPoint(-1, pointX, pointY);
                if (this.mistakes > 10) {
                    this.end();
                }
            }
        }
    }
    ngOnInit(): void {
        this.throwOutSounds = [
            this.initSound('/assets/sound/conveyor-bin/throw-out-1.mp3'),
            this.initSound('/assets/sound/conveyor-bin/throw-out-2.mp3'),
            this.initSound('/assets/sound/conveyor-bin/throw-out-3.mp3'),
        ];

        this.backgroundMusic = document.createElement('audio');
        this.backgroundMusic.src = '/assets/sound/music/conveyorbin.wav';

        this.backgroundMusic.onloadedmetadata = () => {
            this.timeMax = this.backgroundMusic.duration;
        };
    }

    ngAfterViewInit(): void {
        this.router.events.pipe(
            filter((e: any) => e instanceof NavigationStart),
            // tslint:disable-next-line: deprecation
        ).subscribe((e: NavigationStart) => {
            this.end();
        });

        this.init();
    }

    init(): void {
        this.backgroundMusic.loop = true;

        document.body.addEventListener('keydown', this.keydownListener);

        this.bins = this.binElements._results.map((v: ElementRef, i: number) => {
            const el = v.nativeElement;
            const bin = new Bin();
            bin.element = el;
            bin.acceptedTypes = this.binsAcceptedTypes[i];

            return bin;
        });

        this.conveyor = new Conveyor();
        this.conveyor.element = this.conveyorElement.first.nativeElement;
        this.conveyor.speed = 2;
        this.mainLoopID = setInterval(() => {
            if (!this.suspended) {
                if (this.milliseconds % (this.simulationSpeed * 100) === 0) {
                    this.spawnTrash();
                }

                this.trashes.forEach((trash, i) => {
                    this.updateTrash(trash, i);
                });

                this.milliseconds += this.simulationSpeed;
            }
        }, this.simulationSpeed) as any as number;
        this.timeCounterID = setInterval(() => {
            if (!this.suspended) {
                this.time += 0.25;
                if (this.time > this.timeMax) {
                    this.won = true;
                    this.end();
                }
            }
        }, 250) as any as number;
    }
    finalise(): void {
        clearInterval(this.timeCounterID);
        clearInterval(this.mainLoopID);
        document.body.removeEventListener('keydown', this.keydownListener);
        this.throwOutSounds.forEach(v => this.clearSound(v));
        this.clearSound(this.backgroundMusic);
    }
    end(): void {
        this.pause();

        this.ended = true;

        let medal = Medal.None;
        if (this.won) {

            const successRate = (10 - this.mistakes) / 10;

            if (successRate > 0) {
                const owned = this.userdata.getOwnedCardIds();

                let newCard = null;

                do {
                    newCard = this.db.getRandomCardId(successRate - .5);
                } while (owned.includes(newCard));

                this.userdata.addCard(newCard);
                this.wonCard = this.db.getCard(newCard);
            }
            if (successRate > .5) medal = Medal.Bronze;
            if (successRate > .75) medal = Medal.Silver;
            if (successRate > .9) medal = Medal.Gold;
        }

        const id = '0';
        const data = this.userdata.getMinigameUserdata(id);
        if (data.medal < medal) data.medal = medal;
        data.played = true;

        this.userdata.saveMinigameUserdata(id, data);
    }
    pause(): void {
        this.suspended = true;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    start(): void {
        this.backgroundMusic.play();
        this.suspended = false;

        // tslint:disable-next-line: no-conditional-assignment
    }

    restart(): void {
        this.points = 0;
        this.ended = false;
        this.backgroundMusic.currentTime = 0;
        this.time = 0;
        this.trashes.forEach(v => v.el.element.remove());
        this.trashes = [];
        this.nextId = 0;
        this.milliseconds = 0;
        this.start();
    }

    getRandomType(): string {
        const i = Math.floor(Math.random() * this.trashTypes.length);
        return this.trashTypes[i];
    }
    getRandomTrash(): string {
        const i1 = Math.floor(Math.random() * 3);
        return this.getRandomType() + '-' + i1 + '.png';
    }
}
