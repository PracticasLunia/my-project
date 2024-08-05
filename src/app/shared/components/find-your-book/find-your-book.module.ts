import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindYourBookComponent } from './find-your-book.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FindYourBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FindYourBookComponent
  ]
})
export class FindYourBookModule { }
