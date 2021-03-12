import { Component, OnInit } from '@angular/core';
import { DbService, Minigame, Saved } from '../db.service';
import { MinigameUserdata, UserdataService } from '../userdata.service';

@Component({
    selector: 'app-dashboard-minigames',
    templateUrl: './dashboard-minigames.component.html',
    styleUrls: ['./dashboard-minigames.component.scss']
})
export class DashboardMinigamesComponent implements OnInit {

    constructor(
        private db: DbService,
        private userdata: UserdataService,
    ) { }

    ngOnInit(): void {
    }

    getMinigames(): Saved<Minigame>[] {
        return this.db.getAllMinigames();
    }
    getMinigameUserdata(id: string): MinigameUserdata {
        return this.userdata.getMinigameUserdata(id);
    }
}
