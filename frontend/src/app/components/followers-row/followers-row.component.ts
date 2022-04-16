import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers-row',
  templateUrl: './followers-row.component.html',
  styleUrls: ['./followers-row.component.css']
})
export class FollowersRowComponent implements OnInit {
  @Input() text: string = '';
  @Input() followers: any;
  constructor() { }

  ngOnInit(): void {
  }
  get slice():any{
    return this.followers;
  }

}
