import { Component, OnInit } from '@angular/core';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {
  feed: IRecipeMini[] = [];
  sortType: string = 'newest';
  constructor(private ss: SubmissionService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData():void{
    this.ss.getFeed(this.sortType).subscribe({
      next: (data) => {this.feed = data},
      error: (e) => console.log(e)
    })
  }
  newestBtnHandler() {
    if (this.sortType === 'newest') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.sortType = 'newest';
    this.getData();
  }
  popularBtnHandler() {
    if (this.sortType === 'oldest') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.sortType = 'oldest';
    this.getData();
  }
}
