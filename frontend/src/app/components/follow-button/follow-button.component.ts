import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {
  @Input() author: any;
  following: boolean = false;
  constructor(private us: UserService, private storage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.author.followers.some((x: string) => x === this.storage.getUser()._id)) {
      this.following = true;
    }
  }

  follow(): void {
    if (!this.storage.isAuthenticated) this.router.navigate(['/']);
    this.us.follow(this.author.username).subscribe({
      next: data => { this.following = true },
      error: (e) => console.log(e)
      
    })
  }
  unfollow(): void {
    if (!this.storage.isAuthenticated) this.router.navigate(['/']);
    this.us.unfollow(this.author.username).subscribe({
      next: data => { this.following = false },
      error: (e) => console.log(e)
    })
  }
  followHandler(): void {
    if (!this.storage.isAuthenticated) this.router.navigate(['/']);
    this.following ? this.unfollow() : this.follow();
  }
}
