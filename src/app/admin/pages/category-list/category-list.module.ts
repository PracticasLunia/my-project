import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../../../shared/components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { NewCategoryModalModule } from "../../components/new-category-modal/new-category-modal.module";



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
    NavbarModule,
    FormsModule,
    NewCategoryModalModule
]
})
export class CategoryListModule { }
