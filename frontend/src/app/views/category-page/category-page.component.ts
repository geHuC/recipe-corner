import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  recipes: IRecipeMini[] = [];
  category: string = '';
  sortType: string = 'newest';
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private ss: SubmissionService) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.getData();
  }
  getData() {
    this.ss.getCategory(this.category, this.sortType).subscribe({
      next: data => {
        this.recipes = data;
        this.loading = false;
      }
    })
  }
  newestBtnHandler() {
    if (this.sortType === 'newest') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.sortType = 'newest';
    this.loading = true;
    this.getData();
  }
  popularBtnHandler() {
    if (this.sortType === 'oldest') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.sortType = 'oldest';
    this.loading = true;
    this.getData();
  }
}
