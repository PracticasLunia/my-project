import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(
   // private formBuilder: FormBuilder,
   // private loginService: LoginService,
   // private router: Router,
   // private activatedRouter: ActivatedRoute,
  ){}

  ngOnInit(){
   /* this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })*/
  }

  onSubmit(){
   /*if(this.userForm.valid){
      let user: User = this.userForm.value;
      this.loginService.login(user.email, user.password).subscribe();
    }*/
  }
}
