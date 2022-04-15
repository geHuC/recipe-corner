import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-author-controls',
  templateUrl: './author-controls.component.html',
  styleUrls: ['./author-controls.component.css']
})
export class AuthorControlsComponent implements OnInit {
  @Input() recipe!: IRecipeMini;
  showConfirm: boolean = false;
  showEdit: boolean = false;
  constructor(private ss: SubmissionService, private router: Router, private storage:TokenStorageService) { }

  ngOnInit(): void {
  }
  get isAuth(): boolean {
    return this.storage.isAuthenticated;
  }
  deleteClick(): void {
    this.showConfirm = true;
  }
  hideBox(): void {
    this.showConfirm = false;
  }
  deletePost(): void {
    this.ss.delete(this.recipe._id).subscribe({
      next: data => {this.router.navigate(['/']);},
      error: e => alert('Something went wrong on our end')
    })
  }
  editClick():void{
    this.showEdit = true;
  }
  hideEdit():void{
    this.showEdit = false;
  }
}
