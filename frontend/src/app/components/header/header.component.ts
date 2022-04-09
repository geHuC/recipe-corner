import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private auth: AuthService, public storage: TokenStorageService, private router: Router) { }
  ngOnInit(): void {
  }
  logout(): void {
    this.auth.logout();
  }
  onSearch(search: any): void {
    const searchTerm = search.value['search-term'];
    if (searchTerm != '') this.router.navigate(['search'], { queryParams: { q: searchTerm } })
  }
}
