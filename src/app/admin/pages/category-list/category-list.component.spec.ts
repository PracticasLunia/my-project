import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetAllService } from '../../services/category/getAll/getAll.service';
import { find, of, take } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DeleteService } from '../../services/category/delete/delete.service';


@Component({
  selector: 'app-admin-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-new-category-modal',
  template: '<div>New Category Modal</div>'
})
class MockNewCategoryModalComponent {
  @Input() categoryId: number = -1;
}

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let getAllService: GetAllService;
  let deleteService: DeleteService;
  let fixture: ComponentFixture<CategoryListComponent>;
  const testCategorys = [
    {title: 'test1', author: 'test1', isbn: '1'},
    {title: 'test2', author: 'test2', isbn: '2'},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListComponent, MockNavbarComponent, MockNewCategoryModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers:[
        { provide: GetAllService, useValue: {getAll: jasmine.createSpy('getAll').and.returnValue(of(testCategorys))}},
        { provide: DeleteService, useValue: {delete: jasmine.createSpy('delete').and.returnValue(of(void 1))}}
      ]
    })
    .compileComponents();

    getAllService = TestBed.inject(GetAllService);
    deleteService = TestBed.inject(DeleteService);
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load category list on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(getAllService.getAll).toHaveBeenCalled();
    expect(component.categoryList.length).toBe(2);
  });

  it('should search categorys', () => {
    component.getCategories();
    fixture.detectChanges();

    expect(getAllService.getAll).toHaveBeenCalled();
    expect(component.categoryList.length).toBe(2);
  });

  it('should delete category', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.deleteCategory(1);
    fixture.detectChanges();

    expect(deleteService.delete).toHaveBeenCalled();
    expect(deleteService.delete).toHaveBeenCalledWith(1);
  });
});

