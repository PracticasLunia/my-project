import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewCategoryModalModule } from "../../components/new-category-modal/new-category-modal.module";
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: CategoryListComponent
        }
    ]),
    FormsModule,
    NewCategoryModalModule,
    AdminNavbarModule
]
})
export class CategoryListModule { }
