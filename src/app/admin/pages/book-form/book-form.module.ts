import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from './book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../../../shared/components/navbar/navbar.module';
import { NewCategoryModalModule } from '../../components/new-category-modal/new-category-modal.module';



@NgModule({
  declarations: [
    BookFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookFormComponent
      }
    ]),
    NavbarModule,
    NewCategoryModalModule
  ],
})
export class BookFormModule { }
