import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAdminComponent } from './not-admin.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotAdminComponent
      }
    ])
  ]
})
export class NotAdminModule { }
