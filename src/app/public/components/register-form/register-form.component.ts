import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  errorMessage: string = " ";

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
  ){}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.userForm.valid){
      let user: User = this.userForm.value;
      this.registerService.register(user).subscribe((user) => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.error['error'];
      });
    } else {
      this.errorMessage = "Form is invalid"
    }
  }
}
