import { Component, Input } from '@angular/core';
import { VerifyService } from '../../services/verify/verify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user-modal',
  templateUrl: './verify-user-modal.component.html',
  styleUrl: './verify-user-modal.component.css'
})
export class VerifyUserModalComponent {
  @Input() userName: string = '';
  @Input() userId: number = -1;
  opened: boolean = false;
  verifing: boolean = false;

  constructor(
    private verifyService: VerifyService,
    private router: Router, private activatedRoute: ActivatedRoute
  ){}

  verifyUser(id: number): void {
    this.verifing = true;
    //this.verifyService.verify(id).subscribe(() => {
      //this.verifing = false;
      //window.location.reload();
    //});
  }

  openModal() {
    this.opened = true
  }

  closeModal() {
    this.opened = false
  }
}
