import { Component, Input, OnInit } from '@angular/core';
import { VerifyService } from '../../services/user/verify/verify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from '../../services/category/create/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrl: './new-category-modal.component.css'
})
export class NewCategoryModalComponent implements OnInit {
  opened: boolean = false;
  creating: boolean = false;
  categoryForm: FormGroup = new FormGroup({});
  errorMessage: string = "";

  constructor(
    private createCategoryService: CreateService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createCategory(): void {
    if(this.categoryForm.valid){
      this.errorMessage = "";
      const data: Category = this.categoryForm.value
      this.creating = true;
      this.createCategoryService.create(data).subscribe(() => {
        this.creating = false;
        this.windowReload();
      });
    }else
      this.errorMessage = "Form invalid";
  }

  windowReload(){
    window.location.reload();
  }

  openModal() {
    this.opened = true
  }

  closeModal() {
    this.opened = false
  }
}
