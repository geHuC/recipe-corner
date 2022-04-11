import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {
  user: any = {};
  show: boolean = false;
  constructor(private storage: TokenStorageService, private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
  }
  logout():void{
    this.auth.logout();
  }
  toggleMenu(): void {
    this.show = !this.show;
  }
}
