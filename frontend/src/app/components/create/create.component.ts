import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms'
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  imageURL: string = '';
  imgError: any = {};
  submitted: boolean = false;
  serverErrorMsg: any = {};

  @ViewChild('imgBtn') imgBtn!: ElementRef;
  constructor(private fb: FormBuilder, private ss: SubmissionService) { }

  form: FormGroup = this.fb.group({
    image: [null, { validators: [Validators.required] }],
    title: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    instructions: ['', { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)], updateOn: 'blur' }],
    category: ['', { validators: [Validators.required], updateOn: 'blur' }],
    description: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    cooktime: ['', { validators: [Validators.required], updateOn: 'blur' }],
    preptime: ['', { validators: [Validators.required], updateOn: 'blur' }],
    portions: ['', { validators: [Validators.required], updateOn: 'blur' }],
    ingredients: this.fb.array([]),
  });

  ngOnInit(): void {
    this.addIngredient();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  classes(field: string) {
    return { 'invalid': (this.f[field].errors && (this.f[field].touched || this.submitted)) || (this.serverErrorMsg[field]), 'valid': this.f[field].valid }
  }

  ingredients(): FormArray {
    return this.form.get("ingredients") as FormArray;
  }

  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      qty: '',
      product: ['', { validators: [Validators.required], updateOn: 'blur' }],
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
  removeIngredient(index: number): void {
    this.ingredients().removeAt(index);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.imgError.size || this.imgError.type) {
      return;
    }
    this.form.disable();
    this.ss.submit(this.form).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
        alert('Something went wrong on our side, please try again later');
      }
    })
  }
}
