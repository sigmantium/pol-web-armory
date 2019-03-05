// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ArmoryComponent } from './components/armory/armory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerStatisticsComponent } from './components/server-statistics/server-statistics.component';
import { GuildsComponent } from './components/guilds/guilds.component';
import { PlayersComponent } from './components/players/players.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { WikiDetailComponent } from './components/wiki/wiki-detail/wiki-detail.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'server-statistics', component: ServerStatisticsComponent },
  { path: 'online-players', component: PlayersComponent },
  { path: 'guilds', component: GuildsComponent },
  { path: 'armory', component: ArmoryComponent },
  {
    path: 'wiki',
    component: WikiComponent,
    children: [
      {
        path: ':id',
        component: WikiDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
