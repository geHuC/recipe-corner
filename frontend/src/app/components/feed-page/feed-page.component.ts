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
  constructor(private ss: SubmissionService) { }

  ngOnInit(): void {
    this.ss.getFeed().subscribe({
      next: (data) => {this.feed = data},
      error: (e) => console.log(e)
    })
  }

}
