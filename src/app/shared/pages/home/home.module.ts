import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FindYourBookModule } from "../../components/find-your-book/find-your-book.module";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FindYourBookModule,
    RouterModule.forChild([
      {
          path: '',
          component: HomeComponent
      }
    ]),
  ]
})
export class HomeModule { }
