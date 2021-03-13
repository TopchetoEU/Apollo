import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Saved } from '../db.service';

class Rect {
    public top: number;
    public left: number;
    public bottom: number;
    public right: number;

    private checkPointInRect(x: number, y: number, rect: Rect): boolean {
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }
    private checkRectInRect(a: Rect, b: Rect): boolean {
        return this.checkPointInRect(a.left,  a.top,    b) ||
               this.checkPointInRect(a.right, a.top,    b) ||
               this.checkPointInRect(a.left,  a.bottom, b) ||
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


    public checkCollision(el: HTMLElement): boolean {
        const a = new Rect(this.element.getBoundingClientRect());
        const b = new Rect(el.getBoundingClientRect());

        return a.collidesWith(b);
    }
    public getUpVelocity(el: HTMLElement): number {
        return  this.element.getBoundingClientRect().top - el.getBoundingClientRect().bottom;
    }
}
class Bin {
    public acceptedTypes: string[];
    public element: HTMLElement;
    public checkTrashColission(trash: Trash): boolean {
        return new Rect(trash.element.getBoundingClientRect()).collidesWith(new Rect(this.element.getBoundingClientRect()));
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

    public update(gravity: number, friction: number, conveyor: Conveyor, ...bins: Bin[]): { x: number, y: number, bin?: Bin } {
        let x;
        let y;

        const rect = this.element.getBoundingClientRect();
        x = rect.left;
        y = rect.top;

        this.velY += gravity;
        y += this.velY;

        if (conveyor.checkCollision(this.element)) {
            const velCorrection = conveyor.getUpVelocity(this.element);
            this.velY = 0;
            y += velCorrection;
            this.velX = conveyor.speed;
        }
        else if (Math.abs(this.velX) > 0) {
            this.velX = Math.sign(this.velX) * (Math.abs(this.velX) - friction);
        }

        const bin = bins.find(v => new Rect(rect).collidesWith(new Rect(v.element.getBoundingClientRect())));
        x += this.velX;

        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';

        return {x, y, bin};
    }
}

@Component({
    selector: 'app-minigame-conveyor-recycling',
    templateUrl: './minigame-conveyor-recycling.component.html',
    styleUrls: ['./minigame-conveyor-recycling.component.scss']
})
export class MinigameConveyorRecyclingComponent implements AfterViewInit {
    conveyorFrame = 1;
    frameCounterID: number;
    trashTrowerID: number;
    trashSpeed = 1000;
    trashTypes: string[] = [ 'plastic', 'metal', 'glass', 'paper', 'other' ];
    nextId = 0;

    @ViewChildren('conveyor') conveyorElement;
    @ViewChildren('bin') binElements;

    bins: Bin[];

    conveyor: Conveyor;

    trashes: Saved<Trash>[] = [];

    binWidth = 146;

    milliseconds = 0;

    keydownListener = (e) => {
        const code = e.keyCode as number;
        if (code === 65) console.log('move left');
        if (code === 68) console.log('move right');
    }

    constructor(
        private zone: NgZone,
        private router: Router,
        private element: ElementRef,
    ) { }

    ngAfterViewInit(): void {
        this.router.events.pipe(
            filter((e: any) => e instanceof NavigationStart),
            // tslint:disable-next-line: deprecation
        ).subscribe((e: NavigationStart) => {
            this.end();
        });

        this.start();
    }

    end(): void {
        clearInterval(this.frameCounterID);
        document.body.removeEventListener('keydown', this.keydownListener);
    }

    start(): void {
        document.body.addEventListener('keydown', this.keydownListener);

        this.bins = this.binElements._results.map((v: ElementRef) => {
            const el = v.nativeElement;
            const bin = new Bin();
            bin.element = el;
            bin.acceptedTypes = ['paper'];

            return bin;
        });

        this.conveyor = new Conveyor();
        this.conveyor.element = this.conveyorElement.first.nativeElement;
        this.conveyor.speed = 2;
        this.frameCounterID = setInterval(() => {
            this.zone.run(() => {
                this.conveyorFrame = (++this.conveyorFrame % 3);
            });
        }, 1000) as any as number;
        this.frameCounterID = setInterval(() => {
            if (this.milliseconds % (1000 / 10) === 0) {
                const trash = new Trash();
                const element = document.createElement('img');
                element.style.position = 'absolute';

                trash.dropped.subscribe(() => {
                    trash.element.remove();

                });

                trash.velX = 2;
                trash.velY = 0;

                trash.type = this.getRandomType();
                trash.imageUrl = `/assets/images/conveyor-belt/${trash.type}-${Math.floor(Math.random() * 3) + 1}.png`;

                element.src = trash.imageUrl;
                trash.element = element;

                this.element.nativeElement.prepend(element);

                this.trashes.push({ id: (this.nextId++).toString(), el: trash });
            }

            this.trashes.forEach((trash, i) => {
                const newPos = trash.el.update(9 / 100, .05, this.conveyor, ...this.bins);
                if (newPos.y > document.body.getBoundingClientRect().bottom) {
                    trash.el.element.remove();
                    this.trashes.splice(i, 1);
                }

                if (newPos.bin) {
                    trash.el.element.remove();
                    this.trashes.splice(i, 1);
                }
            });

            this.milliseconds++;
        }, 10) as any as number;


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
