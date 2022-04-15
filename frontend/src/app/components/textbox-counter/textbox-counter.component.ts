import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textbox-counter',
  templateUrl: './textbox-counter.component.html',
  styleUrls: ['./textbox-counter.component.css']
})
export class TextboxCounterComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() initialValue: string = '';
  @Input() maxLength: number = 100;
  @Input() value: string = "";
  @Input() placeholderValue: string = "";
  @Input() control: string = "";
  charachtersCount!: number;
  counter!: string;

  ngOnInit(): void {
    this.value = this.initialValue;
    this.charachtersCount = this.value ? this.value.length : 0;
    this.counter = `${this.charachtersCount}/${this.maxLength}`;
  }
  constructor() { }
  onValueChange(e: any): void {
    if (e.target.value.length > this.maxLength) {
      return;
    }
    this.value = e.target.value;
    this.charachtersCount = e.target.value.length;
    this.counter = `${this.charachtersCount}/${this.maxLength}`;
  }
}
