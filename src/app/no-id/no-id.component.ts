import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-id',
  templateUrl: './no-id.component.html',
  styleUrls: ['./no-id.component.css']
})
export class NoIdComponent implements OnInit {
  @Input() inputId: number;

  constructor() { }

  ngOnInit() {
  }

  addQuery(e, id): void {
    if(e.keyCode == 13) {
      window.location.href = `http://localhost:4200/?id=${id}`;
    }
  }
}
