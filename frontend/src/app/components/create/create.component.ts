import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  step: number = 0;
  imageURL: string = '';
  constructor(private fb: FormBuilder, private ss: SubmissionService) { }

  form: FormGroup = this.fb.group({
    image: [null, {validators:[Validators.required]}],
    title: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    description: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    cooktime: ['', { validators: [Validators.required], updateOn: 'blur' }],
    preptime: ['', { validators: [Validators.required], updateOn: 'blur' }],
    portions: ['', { validators: [Validators.required], updateOn: 'blur' }],
    ingredients: this.fb.array([]),
    steps: this.fb.array([])
  });

  ngOnInit(): void {
  }
  ingredients(): FormArray {
    return this.form.get("ingredients") as FormArray;
  }
  steps(): FormArray {
    return this.form.get("steps") as FormArray
  }
  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }
  addStep() {
    this.steps().push(this.newStep());
  }
  newIngredient(): FormGroup {
    return this.fb.group({
      qty: '',
      product: ['', { validators: [Validators.required], updateOn: 'blur' }],
    })
  }
  newStep(): FormGroup {
    return this.fb.group({
      step: (++this.step).toString(),
      instruction: ['', { validators: [Validators.required], updateOn: 'blur' }],
    })
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
