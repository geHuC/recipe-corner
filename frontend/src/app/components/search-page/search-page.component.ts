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
  constructor(private route: ActivatedRoute, private ss: SubmissionService) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap(data => this.ss.search(data['q'] || '')))
      .subscribe(info => this.recipes = info);
  }

}
