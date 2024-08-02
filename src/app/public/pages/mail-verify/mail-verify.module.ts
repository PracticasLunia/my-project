import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailVerifyComponent } from './mail-verify.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MailVerifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MailVerifyComponent
      }
    ])
  ]
})
export class MailVerifyModule { }
