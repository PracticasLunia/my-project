import { Component, Input } from '@angular/core';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'app-verify-user-modal',
  templateUrl: './verify-user-modal.component.html',
  styleUrl: './verify-user-modal.component.css'
})
export class VerifyUserModalComponent {
  @Input() userName: string = '';
  @Input() userId: number = -1;

  constructor(
    private verifyService: VerifyService
  ){}

  verifyUser(id: number): void {
    this.verifyService.verify(id).subscribe();
  }
}
