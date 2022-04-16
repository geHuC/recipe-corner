import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
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
  submitted: boolean = false;
  serverErrorMsg: any = {};

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder) {
  };
  
  ngOnInit() {
    this.form = this.fb.group(
      {
        username: ['', { validators: [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9_]+$/)], updateOn: 'blur' }],
        email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
        password: ['', { validators: [Validators.required, Validators.minLength(8)], updateOn: 'blur' }],
        repeatPassword: ['', [Validators.required]]
      }, {
      validators: [ConfirmValidators.MustMatch('password', 'repeatPassword')]
    }
    )
  };

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  classes(field: string) {
    return { 'invalid': (this.f[field].errors && (this.f[field].touched || this.submitted)) || (this.serverErrorMsg[field]), 'valid': this.f[field].valid }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid || Object.keys(this.serverErrorMsg).length > 0) return;

    const { username, email, password } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveUser(data.user);
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['']);
      },
      error: (e) => {
        this.serverErrorMsg = { ...e.error };
        for (const key in this.serverErrorMsg) {
          this.f[key].valueChanges.pipe(first()).subscribe(data => delete this.serverErrorMsg[key]);
        }
      }
    }
    )
  }
}
