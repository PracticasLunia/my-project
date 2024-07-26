import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCategoryModalComponent } from './new-category-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewCategoryModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewCategoryModalComponent
  ]
})
export class NewCategoryModalModule { }
