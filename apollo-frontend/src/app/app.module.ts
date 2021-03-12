import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  IgxButtonModule,
  IgxIconModule,
  IgxRippleModule,
} from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMinigamesComponent } from './dashboard-minigames/dashboard-minigames.component';
import { MinigameCardComponent } from './minigame-card/minigame-card.component';
import { MinigameConveyorRecyclingComponent } from './minigame-conveyor-recycling/minigame-conveyor-recycling.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DashboardCardsComponent,
    DashboardComponent,
    DashboardMinigamesComponent,
    MinigameCardComponent,
    MinigameConveyorRecyclingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    IgxButtonModule,
    IgxRippleModule,
    IgxIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
