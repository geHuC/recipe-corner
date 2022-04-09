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
  constructor(private ss: SubmissionService) { }

  ngOnInit(): void {
    this.ss.getAll().subscribe(data => this.all = data)
  }

}
