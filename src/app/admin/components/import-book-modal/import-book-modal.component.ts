import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ImportService } from '../../services/book/import/import.service';

@Component({
  selector: 'app-import-book-modal',
  templateUrl: './import-book-modal.component.html',
  styleUrl: './import-book-modal.component.css'
})
export class ImportBookModalComponent {
  @Output() importedEvent = new EventEmitter<boolean>();
  opened: boolean = false;
  fileLoaded: boolean = false;
  importing: boolean = false;
  file: File | null = null;
  errorMessage: string = "";

  constructor(
    private importService: ImportService
  ){}

  importBook(): void {
    this.errorMessage = ""
    this.importing = true;
    if (this.file){
      const formData = new FormData();
      formData.append("file", this.file);
      console.log(formData);
      this.importService.import(formData).subscribe((response) => {
        this.importedEvent.emit(true);
        this.importing = false;
        this.closeModal()
      }, (error) => {
        this.importing = false;
        this.errorMessage = "Failed to load the file, try again or use another file."
      });
    }
  }

  enableImport(event: Event) {
    if (event.target){
      let files = (event.target as HTMLInputElement).files || [];
      if (files.length > 0){
        this.file = files[0];
        this.fileLoaded = true;
      }
    }
  }

  openModal() {
    this.opened = true
    this.fileLoaded = false
    this.errorMessage = "";
  }

  closeModal() {
    this.opened = false
  }
}
