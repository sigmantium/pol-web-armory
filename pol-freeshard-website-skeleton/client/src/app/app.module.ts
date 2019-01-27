import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Materials
import { MatSelectModule } from '@angular/material/select';

// Services
import { ApiService } from './api.service';
import { CharacterService } from './services/character.service';

// Components
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ArmoryComponent } from './components/armory/armory.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ArmoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    ApiService,
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
