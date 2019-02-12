import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Materials
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material';

// Modules
import { RoutingModule } from './routing.module';
import { SlideshowModule } from 'ng-simple-slideshow';

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
import { NavigationComponent } from './components/navigation/navigation.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    ArmoryComponent,
    CanvasComponent,
    DashboardComponent,
    GuildsComponent,
    PlayersComponent,
    ServerStatisticsComponent,
    NavigationComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    RoutingModule,
    SlideshowModule
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
