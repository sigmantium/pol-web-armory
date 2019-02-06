import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Materials
import { MatSelectModule } from '@angular/material/select';

// Modules
import { RoutingModule } from './routing.module';

// Services
import { ApiService } from './api.service';
import { CharacterService } from './services/character.service';
import { GuildService } from './services/guild.service';
import { PlayerService } from './services/player.service';

// Components
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ArmoryComponent } from './components/armory/armory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServerStatisticsComponent } from './components/server-statistics/server-statistics.component';
import { GuildsComponent } from './components/guilds/guilds.component';
import { PlayersComponent } from './components/players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    ArmoryComponent,
    CanvasComponent,
    DashboardComponent,
    GuildsComponent,
    PlayersComponent,
    ServerStatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    ApiService,
    CharacterService,
    GuildService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
