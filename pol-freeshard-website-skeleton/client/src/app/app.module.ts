import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { ApiService } from './api.service';
import { ArmoryService } from './armory/armory.service';

// Components
import { AppComponent } from './app.component';
import { ArmoryComponent } from './armory/armory.component';

@NgModule({
  declarations: [
    AppComponent,
    ArmoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ApiService,
    ArmoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
