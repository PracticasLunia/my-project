import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindYourBookComponent } from './find-your-book.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FindYourBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FindYourBookComponent
      }
    ]),
  ]
})
export class FindYourBookModule { }
