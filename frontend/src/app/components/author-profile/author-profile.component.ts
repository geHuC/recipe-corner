import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  @Input() author: any;
  isMe: boolean = false;
  following: boolean = false;
  
  constructor(private storage: TokenStorageService) { }

  ngOnInit(): void {
    this.isMe = this.author.username === this.storage.getUser().username;
  }

}
