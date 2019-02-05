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

// Components
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ArmoryComponent } from './components/armory/armory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardGuestComponent } from './components/dashboard/dashboard-guest/dashboard-guest.component';
import { DashboardUserComponent } from './components/dashboard/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard/dashboard-admin/dashboard-admin.component';
import { AboutComponent } from './components/about/about.component';
import { HowToJoinComponent } from './components/how-to-join/how-to-join.component';
import { ServerStatisticsComponent } from './components/server-statistics/server-statistics.component';
import { WikipediaComponent } from './components/wikipedia/wikipedia.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ArmoryComponent,
    DashboardComponent,
    DashboardGuestComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    AboutComponent,
    HowToJoinComponent,
    ServerStatisticsComponent,
    WikipediaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    MatSelectModule
  ],
  providers: [
    ApiService,
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
