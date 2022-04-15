import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-edit-submission',
  templateUrl: './edit-submission.component.html',
  styleUrls: ['./edit-submission.component.css']
})
export class EditSubmissionComponent implements OnInit {
  @Input() recipe!: IRecipeMini;
  form!: FormGroup;
  imageURL: string = '';
  submitted: boolean = false;
  serverErrorMsg: any = {};

  @ViewChild('imgBtn') imgBtn!: ElementRef;
  constructor(private fb: FormBuilder, private ss: SubmissionService, private router: Router) { }



  ngOnInit(): void {
    this.imageURL = this.recipe.imageUrl;
    this.form = this.fb.group({
      title: [this.recipe.title, { validators: [Validators.required, Validators.minLength(10)] }],
      instructions: [this.recipe.instructions, { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1000)] }],
      category: [this.recipe.category, { validators: [Validators.required] }],
      description: [this.recipe.description, { validators: [Validators.required, Validators.minLength(10)] }],
      cooktime: [this.recipe.cooktime, { validators: [Validators.required] }],
      preptime: [this.recipe.preptime, { validators: [Validators.required] }],
      portions: [this.recipe.portions, { validators: [Validators.required] }],
      ingredients: this.fb.array([]),
    });

    this.recipe.ingredients.forEach((x: any) => {
      this.refill(x);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  classes(field: string) {
    return { 'invalid': (this.f[field].errors && (this.f[field].touched || this.submitted)) || (this.serverErrorMsg[field]), 'valid': this.f[field].valid }
  }
  refill(x: any) {
    this.ingredients().push(this.newIngredient(x.qty, x.product));
  }
  ingredients(): FormArray {
    return this.form.get("ingredients") as FormArray;
  }

  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  newIngredient(qty: string = '', product: string = ''): FormGroup {
    return this.fb.group({
      qty: qty,
      product: [product, { validators: [Validators.required], updateOn: 'blur' }],
    })
  }

  removeIngredient(index: number): void {
    this.ingredients().removeAt(index);
  }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.ss.update(this.recipe._id, this.form).subscribe({
      next: data => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/recipe', this.recipe.author.username, data.slug], { state: data }))
      },
      error: err => {
        console.log(err);
        alert('Something went wrong on our side, please try again later');
      }
    })
  }
}
