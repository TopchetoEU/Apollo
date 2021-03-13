import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IgxIconService } from 'igniteui-angular';
import { slideInAnimation } from './animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
    ]
})
export class AppComponent implements OnInit {
    title = 'apollo-frontend';

    constructor(
        private icons: IgxIconService,
    ) {}

    ngOnInit(): void {
        this.icons.addSvgIcon('danger', '/assets/icons/risk-skull.svg');
    }
    prepareRoute(outlet: RouterOutlet): void {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
