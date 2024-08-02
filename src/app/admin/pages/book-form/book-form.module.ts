import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from './book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../../../shared/components/navbar/navbar.module';
import { NewCategoryModalModule } from '../../components/new-category-modal/new-category-modal.module';
import { NewTagModalModule } from "../../components/new-tag-modal/new-tag-modal.module";
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';



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
    NewCategoryModalModule,
    NewTagModalModule,
    AdminNavbarModule
],
})
export class BookFormModule { }
