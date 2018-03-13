import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SpeechBubbles, Speech } from './speech-bubbles';
import { responseUnit } from './response-unit';

@Injectable()
export class VideoService {

  private videoUrl = 'https://static.chorus.ai/api/4d79041e-f25f-421d-9e5f-3462459b9934.json';
  private videoResp = [
    {
        "snippet": "Mm-hmm",
        "speaker": "Cust",
        "time": 1.92
    },
    {
        "snippet": "Hello?",
        "speaker": "Rep",
        "time": 3.66
    },
    {
        "snippet": "Yeah,",
        "speaker": "Cust",
        "time": 62.249399999999994
    },
    {
        "snippet": "Hello?",
        "speaker": "Cust",
        "time": 63.979299999999995
    },
    {
        "snippet": "Cool",
        "speaker": "Rep",
        "time": 41.789699999999996
    },
    {
        "snippet": "Yeah,",
        "speaker": "Cust",
        "time": 94.621
    },
    {
        "snippet": "Mm-hmm",
        "speaker": "Rep",
        "time": 69.28960000000001
    },
    {
        "snippet": "Don't simple",
        "speaker": "Rep",
        "time": 66.4694
    },
    {
        "snippet": "In the new gen",
        "speaker": "Rep",
        "time": 16.43
    },
    {
        "snippet": "And by the window experiment",
        "speaker": "Rep",
        "time": 5.78
    },
    {
        "snippet": "Just list most that's him",
        "speaker": "Cust",
        "time": 21.38
    },
    {
        "snippet": "Sorry I'm out on your chance",
        "speaker": "Rep",
        "time": 10.13001
    }
];

  constructor( private http: HttpClient ) { }


  // getData(id: String): Observable<SpeechBubble[]>{
  //   return this.http.get<SpeechBubble[]>(this.videoUrl)
  //     .pipe(
  //       catchError(this.handleError('getTranscript', []))
  //     )
  // }

  getTranscript(): SpeechBubbles[]{
    let id = new URLSearchParams(window.location.search).get("id");

    // Use API when available instead of json mock
    //  let responsesData = this.getData(id);
    let responsesData = this.videoResp;
    return this.organizeSpeech(responsesData);
  }

  private compareTime(a: object, b: object) {
    return a["time"] - b["time"];
  }

  // Sets structure for first bubble by speaker & start speech array full of bubbles
  private startBubble(response: responseUnit): SpeechBubbles {
    return {
      "speaker": response["speaker"],
      "speech": [{
        "time": response["time"],
        "snippet": response["snippet"]
      }]
    };
  }

  // Sets structure for additional bubble in speech array
  private anotherBubble(response: responseUnit): Speech {
    return {
      "time": response["time"],
      "snippet": response["snippet"]
    };
  }

  // Cumulates speech by same speaker
  private organizeSpeech(responsesData: responseUnit[]): SpeechBubbles[] {
    let responses = responsesData.sort(this.compareTime);

    // Sets structure for bubble set by speaker in new array of organized speech bubbles
    let responsesBySpeaker;
    responsesBySpeaker = [this.startBubble(responses[0])]
    responses.shift();

    // Adds bubbles by speaker to new array
    // Adds more bubbles to same speaker if same name
    while(responses.length) {
      if(responsesBySpeaker[responsesBySpeaker.length-1]["speaker"] === responses[0]["speaker"]) {
        responsesBySpeaker[responsesBySpeaker.length-1]["speech"].push(responses[0]);
        responses.shift();
      } else {
        responsesBySpeaker.push(this.startBubble(responses[0]));
        responses.shift();
      }
    }
  
    return responsesBySpeaker;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
