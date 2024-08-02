import { Component, OnInit } from '@angular/core';
import { MailVerifyService } from '../../services/mail-verify/mail-verify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrl: './mail-verify.component.css'
})
export class MailVerifyComponent implements OnInit {
  errorMessage:string = "";

  constructor(
    private mailVerifyService: MailVerifyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token')
    if(token){
      this.mailVerifyService.verify(token).subscribe(() => {
        this.router.navigate(['/']);
      }, (error) => {
        this.errorMessage = "Something happened during your verificaiton, please, try again later";
      })
    }
  }
}
