import { Component, OnInit } from '@angular/core';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  all: IRecipeMini[] = [];
  sortType: string = 'newest';
  page: number = 0;
  loading: boolean = true;
  stopPaging: boolean = false;
  constructor(private ss: SubmissionService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.ss.getAll(this.sortType, this.page).subscribe(data => {
      if (data.length < 20) this.stopPaging = true;
      this.all = data;
      this.loading = false
    })
  }
  newestBtnHandler() {
    if (this.sortType === 'newest') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.loading = true;
    this.sortType = 'newest';
    this.stopPaging = false;
    this.page = 0;
    this.getData();
  }
  popularBtnHandler() {
    if (this.sortType === 'popular') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.loading = true;
    this.sortType = 'popular';
    this.page = 0;
    this.stopPaging = false;
    this.getData();
  }
  changePage() {
    this.page += 1;
    this.ss.getAll(this.sortType, this.page).subscribe(data => {
      if (data.length < 20) this.stopPaging = true;
      this.all = [...this.all, ...data]
    })
  }
}
