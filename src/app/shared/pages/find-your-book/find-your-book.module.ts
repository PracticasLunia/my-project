import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindYourBookComponent } from './find-your-book.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from "../../components/navbar/navbar.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FindYourBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: FindYourBookComponent
        }
    ]),
    NavbarModule,
    FormsModule
  ]
})
export class FindYourBookModule { }
