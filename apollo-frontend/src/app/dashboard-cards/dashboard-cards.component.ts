import { Component, OnInit } from '@angular/core';
import { Card, DbService } from '../db.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {

  constructor(
    private userdata: UserdataService,
  ) { }

  ngOnInit(): void {
  }

  getCards(): Card[] {
    return this.userdata.getOwnedCards();
  }
}
