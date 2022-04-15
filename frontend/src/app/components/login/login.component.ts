import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted: boolean = false;
  serverError: boolean = false;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  onSubmit(login: any): void {
    this.submitted = true;
    this.serverError = false;
    if (login.invalid) return;
    const { username, password } = login.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
        this.router.navigate(['..'])
      },
      error: err => {
        console.log(err);
        this.serverError = true;
      }
    }
    )
  }

}
