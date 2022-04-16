import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: string = '';
  user: any = {};
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private us: UserService, private storage: TokenStorageService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('user') || '';
    this.us.getByUsername(this.username).subscribe({
      next: data => {
        this.user = data;
        this.loading = false;
      },
    })
  }

}
