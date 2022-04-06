import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(register:any): void {
    const { username, email, password, repeatPassword, fullname } = register.form.value;
    console.log(username);

    this.authService.register(username, email, password, repeatPassword, fullname).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
