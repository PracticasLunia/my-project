import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../public/services/register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { GetService } from '../../services/get/get.service';
import { UpdateService } from '../../services/update/update.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup = new FormGroup({});
  userOldPassword: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private getService: GetService,
    private updateService: UpdateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', ],
      admin: [false, Validators.required]
    });

    let id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '-1');
    if (id){
      this.getService.get(id).subscribe((user: User) => {
        if(user){
          this.userOldPassword = user.password;
          user.password = "";
          this.userForm.patchValue(user);
        }
      })
    }
  }

  onSubmit(){
    if(this.userForm.valid){
      let user: User = this.userForm.value;
      if (user.password === '')
        user.password = this.userOldPassword;
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '-1');
      if(id){
        this.updateService.update(id, user).subscribe(() => {
          this.router.navigate(['/users'])
        })
      }
    }
  }
}
