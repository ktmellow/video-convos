import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { SpeechBubbles } from '../speech-bubbles';
import { HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: any;
  @HostListener('timeupdate') onTimeUpdate(){
    this.currentTime = this.videoplayer.nativeElement.currentTime;
  }

  transcript: SpeechBubbles[];
  id: string;
  currentTime: number;

  constructor(private videoService: VideoService) {}
  
  ngOnInit() {
    this.getData();
  }

  getData(): void {
    // Sets ID for video render and for transcript AJAX call
    let id = new URLSearchParams(window.location.search).get("id");
    if(id) this.id = id;
  
    // TO DO: swap with getTranscript(id)
    this.transcript = this.videoService.getTranscript();
  } 

}
