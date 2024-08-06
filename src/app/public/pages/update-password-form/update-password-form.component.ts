import { UpdatePasswordService } from '../../services/update-password/update-password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css'
})
export class UpdatePasswordFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  errorMessage: string = "";
  logging: boolean = false;
  buttonText: string = "Update password";

  constructor(
    private formBuilder: FormBuilder,
    private updatePasswordService: UpdatePasswordService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    })
  }

  onSubmit(){
    this.logging = true;
    this.buttonText = "Updating..."
    if(this.userForm.valid){
      if (this.userForm.value.password !== this.userForm.value.repeatPassword){
        this.errorMessage = "Passwords are not equal"
        this.logging = false;
        this.buttonText = "Update password";
        return;
      }
      const token = this.activatedRouter.snapshot.paramMap.get('token') || ''
      let user: User = this.userForm.value;
      this.updatePasswordService.updatePassword(token, user.password).subscribe(() => {
        this.logging = true;
        this.buttonText = "Updated, go login";
        this.errorMessage = "";
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = "Some error happend";
        this.logging = false;
        this.buttonText = "Update password";
      });
    } else {
      this.errorMessage = "Form is invalid"
      this.logging = false;
      this.buttonText = "Update password";
    }
  }
}
