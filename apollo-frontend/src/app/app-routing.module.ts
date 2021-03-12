import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MinigameConveyorRecyclingComponent } from './minigame-conveyor-recycling/minigame-conveyor-recycling.component';

const routes: Routes = [
    { path: 'minigames/conveyor-belt', component: MinigameConveyorRecyclingComponent },
    { path: '', component: DashboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
