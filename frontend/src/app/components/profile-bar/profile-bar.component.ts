import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.css']
})
export class ProfileBarComponent implements OnInit {
  @Input() user: any;
  @Input() label: string = '';
  isMe: boolean = false;
  views: number = 0;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isMe = this.token.getUser()._id == this.user._id;
    this.views = this.user.submissions.reduce((a: any, b: any) => a + b.views, 0);
  }
  
  get isAuthenticated(): boolean {
    return this.token.isAuthenticated;
  }

}
