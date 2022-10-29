import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

// Import services
import { FeedsService } from "./services/feeds.service";

// Import components
import {
  HeaderComponent
} from './components';
const UI_COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...UI_COMPONENTS
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [FeedsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
