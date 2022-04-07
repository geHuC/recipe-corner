import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  step:number = 0;
  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
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
      type: ''
    })
  }
  newStep(): FormGroup {
    return this.fb.group({
      step: (++this.step).toString(),
      description: ''
    })
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
