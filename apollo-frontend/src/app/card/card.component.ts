import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { IgxIconService } from 'igniteui-angular';
import { Card } from '../db.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @ViewChild('container') containerRef: ElementRef;
    @Input() card: Card = {
        imageUrl: '/assets/images/test-card.png',
        name: 'Полярна мечка',
        types: ['endangered'],
        info: [
            {
                heading: 'ОТКРИТИЕ',
                content: 'Полярните мечки имат 4 крака',
            },
            {
                heading: 'ОТКРИТИЕ 2',
                content: 'Полярните мечки имат 2 крака',
            },
            {
                heading: 'ОТКРИТИЕ 3',
                content: 'Полярните мечки имат -69 крака',
            },
        ],
    };

    flipped: boolean = false;

    constructor(
        private icons: IgxIconService,
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
        this.icons.addSvgIcon('danger', 'http://192.168.0.104:8054/assets/icons/risk-skull.svg', 'filter-icons');
    }

    flip() {
        const container = this.containerRef.nativeElement as HTMLDivElement;
        container.style.pointerEvents = 'none';
        container.animate([
            {
                transform: 'perspective(1000px) rotateY(0deg)',
            },
            {
                transform: 'perspective(1000px) rotateY(90deg)',
            },
        ], {
            duration: 100,
            easing: 'cubic-bezier(.62,0,.83,.67)',
        }).onfinish = () => {
            this.zone.run(() => {
                this.flipped = !this.flipped;
                container.animate([
                    {
                        transform: 'perspective(1000px) rotateY(90deg) scaleX(-1)',
                    },
                    {
                        transform: 'perspective(1000px) rotateY(180deg) scaleX(-1)',
                    },
                ], {
                    duration: 100,
                    easing: 'cubic-bezier(0,.59,.63,.83)',
                }).onfinish = () => {
                    container.style.pointerEvents = 'inherit';
                }
            });
        }
    }
}
