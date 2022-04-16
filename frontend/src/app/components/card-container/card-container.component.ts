import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {
  @Input() recipes!: IRecipeMini[];
  @Input() message: string = 'Nothing here yet...';
  @Input() stopPaging: boolean = false;
  @Input() pagination: boolean = false;
  @Output() pageEvent = new EventEmitter<any>();
  askForMore: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.check();
  }
  check(): void {
    console.log(this.stopPaging);
    
    // if (this.recipes.length < 5) {
    //   this.askForMore = false;
    //   console.log('here');
      
    // }
  }
  loadMore(): void {
    this.pageEvent.emit('next page pls');
  }
}
