import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../shared/models/book';
import { GetService } from '../../services/book/get/get.service';
import { UpdateService } from '../../services/book/update/update.service';
import { CreateService } from '../../services/book/create/create.service';
import { Category } from '../../../shared/models/category';
import { GetAllService } from '../../services/category/getAll/getAll.service';
import { DeleteService } from '../../services/category/delete/delete.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  bookForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  bookISBNInitial: string = "";
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private getService: GetService,
    private updateService: UpdateService,
    private createService: CreateService,
    private getAllCategoriesService: GetAllService,
    private deleteCatergoryService: DeleteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      genre: ['', Validators.required],
      publicationDate: ['', Validators.required],
      publisher: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
      pageCount: ['', [Validators.required, Validators.min(1)]],
      coverImage: ['', Validators.required],
      format: ['', Validators.required],
      availability: ['', Validators.required],
      category: ['', ],
      //tags: this.formBuilder.array([]),  // Inicializamos el array de tags vacío
      averageRating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      ratingCount: ['', [Validators.required, Validators.min(0)]],
    });

    this.bookISBNInitial = this.activatedRoute.snapshot.paramMap.get('isbn') || '';
    if (this.bookISBNInitial){
      this.getService.get(this.bookISBNInitial).subscribe((book: Book) => {
        if(book){
          this.bookForm.patchValue(book);
        }
      })
    }

    this.getAllCategoriesService.getAll().subscribe((data) => {
      this.categories = data;
    })
  }

  deleteSelectedCategory() {
    const data: Book = this.bookForm.value
    this.deleteCatergoryService.delete(data.category).subscribe(() => {
      this.getAllCategoriesService.getAll().subscribe((data) => {
        this.categories = data;
      });
    });
  }

  onSubmit(){
    if(this.bookForm.valid){
      let book: Book = this.bookForm.value;
      let isbn = this.activatedRoute.snapshot.paramMap.get('isbn');
      if(isbn){
        console.log(book)
        if (book.category) // sin categoria se queda como "null" en vez de null
        this.updateService.update(isbn, book).subscribe(() => {
          this.router.navigate(['/books'])
        })
      }else {
        this.createService.create(book).subscribe(() => {
          this.router.navigate(['/books'])
        })
      }
    } else {
      this.errorMessage = "Form is invalid"
    }
  }

  addTag(): void {
    const tags = this.bookForm.get('tags') as FormArray;
    tags.push(this.formBuilder.group({
      name: ['', Validators.required]
    }));
  }

  removeTag(i: number): void {
    console.log(i)
    const tags = this.bookForm.get('tags');
    console.log(tags)
    //tags.removeAt(i);
  }
}
