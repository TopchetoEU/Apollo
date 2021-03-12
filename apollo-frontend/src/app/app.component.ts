import { Component, OnInit } from '@angular/core';
import { IgxIconService } from 'igniteui-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'apollo-frontend';

    constructor(
        private icons: IgxIconService,
    ) {}

    ngOnInit(): void {
        this.icons.addSvgIcon('danger', '/assets/icons/risk-skull.svg');
    }

}
