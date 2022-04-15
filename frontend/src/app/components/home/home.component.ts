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
  constructor(private ss: SubmissionService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData():void{
    this.ss.getAll(this.sortType, this.page).subscribe(data => this.all = data)
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
    if (this.sortType === 'popular') return;
    window.scrollTo({
      top: 0,
      left: 0,
    });
    this.sortType = 'popular';
    this.getData();
  }
}
