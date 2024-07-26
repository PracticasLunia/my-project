import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotVerifiedComponent } from './not-verified.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotVerifiedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotVerifiedComponent
      }
    ])
  ]
})
export class NotVerifiedModule { }
