import { Component, OnInit, Input } from '@angular/core';
import { IRecipeMini } from 'src/app/interfaces/irecipe-mini';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: IRecipeMini;
  recipeUrl: string = '';
  constructor() { }

  ngOnInit(): void {
    this.recipeUrl = `/recipe/${this.recipe.author.username}/${this.recipe.slug}`;
  }

}
