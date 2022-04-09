import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private tokenStorage:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(register:any): void {
    const { username, email, password, repeatPassword, fullname } = register.form.value;
    console.log(username);

    this.authService.register(username, email, password, repeatPassword, fullname).subscribe(
      data => {
        this.tokenStorage.saveUser(data.user);
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['']);
      }
    )
  }

}
