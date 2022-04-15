import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {
  user: any;
  show: boolean = false;
  avatar: string = '';
  constructor(public storage: TokenStorageService, private auth: AuthService) { }

  subscription!: Subscription;
  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.avatar = this.user.avatar;
    this.subscription = this.storage.avatarChange.subscribe(data => data ? this.avatar = data : null);
  }
  logout(): void {
    this.auth.logout();
  }
  toggleMenu(): void {
    this.show = !this.show;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
