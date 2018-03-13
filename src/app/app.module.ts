import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { VideoService } from './video.service';
import { NoIdComponent } from './no-id/no-id.component'

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    NoIdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
