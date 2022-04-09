import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ConfirmValidators from 'src/app/helpers/confirmValidator';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder) {
  };
  ngOnInit() {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]]
      }, {
      validators: [ConfirmValidators.MustMatch('password', 'repeatPassword')]
    }
    )
  };
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    console.log('fuck angular');
    console.log(this.form);
    

    // const { username, email, password, repeatPassword } = register.form.value;

    // this.authService.register(username, email, password).subscribe(
    //   data => {
    //     this.tokenStorage.saveUser(data.user);
    //     this.tokenStorage.saveToken(data.token);
    //     this.router.navigate(['']);
    //   }
    // )
  }
}
