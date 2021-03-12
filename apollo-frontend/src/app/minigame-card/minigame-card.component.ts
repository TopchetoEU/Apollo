import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Minigame } from '../db.service';
import { Medal, MinigameUserdata } from '../userdata.service';

@Component({
    selector: 'app-minigame-card',
    templateUrl: './minigame-card.component.html',
    styleUrls: ['./minigame-card.component.scss']
})
export class MinigameCardComponent implements OnInit {
    @ViewChild('container') containerRef: ElementRef;
    @Input() minigame: Minigame = {
        name: 'None',
        url: '/',
    };
    @Input() minigameUserdata: MinigameUserdata = {
        played: true,
        medal: Medal.None,
    };

    flipped: boolean = false;

    constructor(
        private zone: NgZone,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    hasMedal(): boolean {
        return this.minigameUserdata.medal !== Medal.None;
    }
    getMedalType(): string {
        switch (this.minigameUserdata.medal) {
            case Medal.None: return 'никакъв';
            case Medal.Bronze: return 'бронзов';
            case Medal.Silfer: return 'сребърен';
            case Medal.Gold: return 'златен';
        }
    }

    play() {
        this.router.navigate([this.minigame.url], {
            replaceUrl: true,
        });
    }
}
