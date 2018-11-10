import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ControllerComponent } from './controller/controller.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    ControllerComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,

    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
