import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  imageURL: string = '';
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
    const file = (event.target as HTMLInputElement).files![0];
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
  onSubmit() {
    this.ss.submit(this.form).subscribe(data => {
      console.log(data);
    })
  }
}
