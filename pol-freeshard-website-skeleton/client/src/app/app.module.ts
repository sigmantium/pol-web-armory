import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { ApiService } from './api.service';
import { TestserviceService } from './testservice/testservice.service';

// Components
import { AppComponent } from './app.component';
import { TestserviceComponent } from './testservice/testservice.component';

@NgModule({
  declarations: [
    AppComponent,
    TestserviceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ApiService,
    TestserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
