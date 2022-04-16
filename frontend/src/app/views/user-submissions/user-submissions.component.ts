import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-submissions',
  templateUrl: './user-submissions.component.html',
  styleUrls: ['./user-submissions.component.css']
})
export class UserSubmissionsComponent implements OnInit {
  user: any = {};
  username: string = '';
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('user') || '';

    let state = history.state;
    if (state._id) {
      this.user = state;
      this.loading = false;
    } else {
      this.us.getByUsername(this.username).subscribe({
        next: data => { this.user = data; this.loading = false },
        error: e => this.router.navigate(['404'])
      }
      )
    }
  }
}
