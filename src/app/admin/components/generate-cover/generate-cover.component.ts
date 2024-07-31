import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoverService } from '../../services/book/cover/cover.service';

@Component({
  selector: 'app-generate-cover',
  templateUrl: './generate-cover.component.html',
  styleUrl: './generate-cover.component.css'
})
export class GenerateCoverComponent {
  @Input() bookIsbn: string = '-1';
  @Output() bookCoverEvent = new EventEmitter<boolean>();
  disabled: boolean = false;
  textButton: string = "Generate new cover";

  constructor(
    private coverService: CoverService
  ){ }

  generateCover(): void {
    this.disabled = true;
    this.textButton = "Generating";
    this.coverService.cover(this.bookIsbn).subscribe(() => {
      this.bookCoverEvent.emit(true)
      this.disabled = false;
      this.textButton = "Generate new cover";
    })
  }
}
