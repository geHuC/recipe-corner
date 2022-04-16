import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission-row',
  templateUrl: './submission-row.component.html',
  styleUrls: ['./submission-row.component.css']
})
export class SubmissionRowComponent implements OnInit {
  @Input() userData: any;
  @Input() type: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  get lastFive(): any {
    return this.userData[this.type].slice(0, 5);
  }
  get length(): number {
    return this.userData[this.type].length;
  }
}
