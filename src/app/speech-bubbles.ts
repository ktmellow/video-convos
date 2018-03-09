export class SpeechBubbles {
    snippet: string;
    speaker: string;
    speech: Speech[];
}

export class Speech {
    "time": number;
    "snippet": string;
}