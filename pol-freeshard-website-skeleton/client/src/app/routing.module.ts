import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { HowToJoinComponent } from './how-to-join/how-to-join.component';
import { ServerStatisticsComponent } from './server-statistics/server-statistics.component';
import { ArmoryComponent } from './components/armory/armory.component';
import { WikipediaComponent } from './wikipedia/wikipedia.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'how-to-join', component: HowToJoinComponent },
  { path: 'server-statistics', component: ServerStatisticsComponent },
  { path: 'armory', component: ArmoryComponent },
  { path: 'wikipedia', component: WikipediaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
