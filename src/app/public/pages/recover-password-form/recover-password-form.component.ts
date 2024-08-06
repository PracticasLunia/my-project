import { RecoverPasswordService } from './../../services/recover-password/recover-password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrl: './recover-password-form.component.css'
})
export class RecoverPasswordFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  errorMessage: string = "";
  logging: boolean = false;
  buttonText: string = "Recover password";

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: RecoverPasswordService,
  ){}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit(){
    this.logging = true;
    this.buttonText = "Recovering..."
    if(this.userForm.valid){
      let user: User = this.userForm.value;
      this.recoverPasswordService.recoverPassword(user.email).subscribe(() => {
        this.logging = true;
        this.buttonText = "Please, check your email";
        this.errorMessage = "";
      },
      (error) => {
        this.errorMessage = "Some error happend or user not exists";
        this.logging = false;
        this.buttonText = "Recover password";
      });
    } else {
      this.errorMessage = "Form is invalid"
      this.logging = false;
      this.buttonText = "Recover password";
    }
  }
}
