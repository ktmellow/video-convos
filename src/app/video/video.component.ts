import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { SpeechBubble } from '../speech-bubble';
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
    console.log("updated!")
    console.log(this.currentTime)
  }

  transcript: SpeechBubble[];
  id: string;
  currentTime: number;

  constructor(private videoService: VideoService) {

  }
  
  ngOnInit() {
    this.getData();
  }

  // getTranscript(): void{
  //  let id = new URLSearchParams(window.location.search).get("id");
  //   this.videoService.getTranscript()
  //     .subscribe(transcript => this.transcript = transcript);
  // }

  getData(): void {
    // Sets ID for video render and for getting transcript
    let id = new URLSearchParams(window.location.search).get("id");
    if(id) this.id = id;
  
    // TO DO: swap with getTranscript(id)
    this.transcript = this.videoService.getTranscript();
  } 

}
