import { Message } from './../../../../../node_modules/vite/node_modules/esbuild/lib/main.d';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  errorMessage: string = "";
  logging: boolean = false;
  buttonText: string = "Log In";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ){}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.logging = true;
    this.buttonText = "Logging..."
    if(this.userForm.valid){
      let user: User = this.userForm.value;
      this.loginService.login(user.email, user.password).subscribe((tokens) => {
        localStorage.setItem('token', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        this.router.navigate(['/']);
        this.logging = false;
      },
      (error) => {
        this.errorMessage = error.error['error'];
        this.logging = false;
        this.buttonText = "Log in";
      });
    } else {
      this.errorMessage = "Form is invalid"
      this.logging = false;
      this.buttonText = "Log in";
    }
  }
}
