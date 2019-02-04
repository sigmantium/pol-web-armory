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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuestComponent } from './dashboard/dashboard-guest/dashboard-guest.component';
import { DashboardUserComponent } from './dashboard/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { AboutComponent } from './about/about.component';
import { HowToJoinComponent } from './how-to-join/how-to-join.component';
import { ServerStatisticsComponent } from './server-statistics/server-statistics.component';
import { WikipediaComponent } from './wikipedia/wikipedia.component';

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
