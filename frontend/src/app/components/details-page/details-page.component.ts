import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  recipe!: IRecipeMini;
  private author!: string;
  private slug!: string;

  constructor(private route: ActivatedRoute, private ss: SubmissionService) { }

  ngOnInit(): void {
    this.author = this.route.snapshot.paramMap.get('author') || '';
    this.slug = this.route.snapshot.paramMap.get('slug') || '';

    let state = history.state;
    if (state._id) {
      this.recipe = state;
    } else {
      this.ss.getSingle(this.author, this.slug).subscribe(
        data => this.recipe = data
        
      )
    }
  }

}
