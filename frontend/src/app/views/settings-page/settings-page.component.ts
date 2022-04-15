import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  imgError: any = {};
  imageURL: string = '';
  submitted: boolean = false;
  loading: boolean = true;
  form: FormGroup = this.fb.group({
    image: [null],
    bio: ''
  });
  user: any = {};
  constructor(private fb: FormBuilder, private us: UserService, private token: TokenStorageService, private router: Router) { }

  @ViewChild('imgBtn') imgBtn!: ElementRef;

  ngOnInit(): void {
    this.us.getOneById(this.token.getUser()._id).subscribe({
      next: data => {
        this.user = data;
        this.form.patchValue({ bio: data.bio });
        this.imageURL = data.avatar;
        this.loading = false;
      },
      error: e => console.log(e)
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  submit(): void {
    this.us.updateSettings(this.form).subscribe({
      next: data => {
        this.token.changeAvatar(data.avatar);
        this.router.navigate(['/']);
      },
      error: e => console.log(e)
    })
  }
  selectImg(): void {
    this.imgBtn.nativeElement.click();
  }
  showPreview(event: any): void {
    this.imgError = {};
    const file = (event.target as HTMLInputElement).files![0];
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
      this.imgError = { type: 'Image must be a PNG, JPG or JPG' };
      return;
    }
    if (file.size > 3145728) {
      this.imgError = { size: 'Image cannot be larger that 3MB' };
      return;
    }
    this.form.patchValue({
      image: file
    });
    this.form.get('image')!.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
