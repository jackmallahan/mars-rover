import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoverComponent } from './rover/rover.component';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './lib/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, RoverComponent, DialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
