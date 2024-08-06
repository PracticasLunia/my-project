import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from '../../services/download/download.service';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrl: './book-reader.component.css'
})
export class BookReaderComponent {
  @Input() fileUrl: string = 'null';
  open: boolean = false;
  @Input() bookTitle: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private downloadService: DownloadService
  ){}

  readOnline() {
    const isbn = this.activatedRoute.snapshot.paramMap.get('isbn') || '';
    if (!this.fileUrl && isbn.length > 0){
      this.downloadService.download(isbn).subscribe(async (res) => {
        const data = res.body as Blob;
        this.fileUrl = URL.createObjectURL(data);
        this.open = true;
    }, (error) => {

      });
    } else {
      this.open = true;
    }
  }

  closeModal(){
    this.open = false;
  }
}
