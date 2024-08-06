import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordFormComponent } from './update-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UpdatePasswordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdatePasswordFormComponent
      }
    ])
  ],
})
export class UpdatePasswordFormModule { }
