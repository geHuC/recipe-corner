import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  recipes: IRecipeMini[] = [];
  term: string = '';
  sortType: string = 'newest';
  constructor(private route: ActivatedRoute, private ss: SubmissionService) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap(data => {
        this.term = data['q'] || '';
        return this.ss.search(data['q'] || '', this.sortType)
      }
      ))
      .subscribe(info => this.recipes = info);
  }
  getData() {
    this.ss.search(this.term, this.sortType).subscribe({
      next: data => this.recipes = data
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
