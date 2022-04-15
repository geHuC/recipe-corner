import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favourite-btn',
  templateUrl: './favourite-btn.component.html',
  styleUrls: ['./favourite-btn.component.css']
})
export class FavouriteBtnComponent implements OnInit {
  @Input() small: boolean = true;
  @Input() recipe!: IRecipeMini;

  user: any = {};
  hasFavourited: boolean = false;

  constructor(private storage: TokenStorageService, private ss: SubmissionService, private router: Router) { }

  ngOnInit(): void {
    if (this.isAuth) {
      this.user = this.storage.getUser();
      this.checkFav();
    }
  }
  get isAuth(): boolean {
    return this.storage.isAuthenticated;
  }
  checkFav(): void {
    if (this.recipe.favourites.some((x: any) => x === this.user._id)) {
      this.hasFavourited = true;
    }
  }
  favourite(): void {
    if (!this.isAuth) {
      this.router.navigate(['login']);
      return;
    }
    if (this.user.username == this.recipe.author.username) {
      return;
    }
    this.ss.favourite(this.recipe._id).subscribe({
      next: res => this.hasFavourited = true,
      error: e => console.log(e)
    })

  }
  unfavourite(): void {
    this.ss.unfavourite(this.recipe._id).subscribe({
      next: res => this.hasFavourited = false,
      error: e => console.log(e)
    })
  }
  clickHandler(): void {
    this.hasFavourited && this.isAuth ? this.unfavourite() : this.favourite();
  }
}
