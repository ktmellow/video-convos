import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SpeechBubbles, Speech } from './speech-bubbles';
import { responseJson } from './response-json';

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

  constructor(
    private http: HttpClient
  ) { }


  // getTranscript(): Observable<SpeechBubble[]>{
  //   return this.http.get<SpeechBubble[]>(this.videoUrl)
  //     .pipe(
  //       catchError(this.handleError('getTranscript', []))
  //     )
  // }

  getTranscript(): SpeechBubbles[]{
    function compareTime(a: object, b: object) {
      return a["time"] - b["time"];
    }
  
    let responses = this.videoResp.sort(compareTime);

    // Cumulates speech by same speaker
    let responsesBySpeaker;
    responsesBySpeaker = [{
      "speaker": responses[0]["speaker"],
      "speech": [{
        "time": responses[0]["time"],
        "snippet": responses[0]["snippet"]
      }]
    }];

    responses.shift();

    while(responses.length) {
      if(responsesBySpeaker[responsesBySpeaker.length-1]["speaker"] === responses[0]["speaker"]) {
        responsesBySpeaker[responsesBySpeaker[responsesBySpeaker.length-1]["speech"].push({
          "time": responses[0]["time"],
          "snippet": responses[0]["snippet"]});
        responses.shift();
      } else {
        let speechBubble;
        speechBubble = {
          "speaker": responses[0]["speaker"],
          "speech": [{
            "time": responses[0]["time"],
            "snippet": [responses[0]["snippet"]]}]};

        responsesBySpeaker.push(speechBubble);
        responses.shift();
      }
    }
 console.log(responsesBySpeaker)
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
