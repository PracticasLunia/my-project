import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordFormComponent } from './recover-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RecoverPasswordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecoverPasswordFormComponent
      }
    ])
  ],
})
export class RecoverPasswordFormModule { }
