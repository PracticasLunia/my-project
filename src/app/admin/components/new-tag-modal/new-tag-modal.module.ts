import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTagModalComponent } from './new-tag-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewTagModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewTagModalComponent
  ]
})
export class NewTagModalModule { }
