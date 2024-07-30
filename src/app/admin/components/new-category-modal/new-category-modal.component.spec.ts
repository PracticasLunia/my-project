import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCategoryModalComponent } from './new-category-modal.component';
import { CreateService } from '../../services/category/create/create.service';
import { GetService } from '../../services/category/get/get.service';
import { UpdateService } from '../../services/category/update/update.service';
import { Category } from '../../../shared/models/category';

describe('NewCategoryModalComponent', () => {
  let component: NewCategoryModalComponent;
  let fixture: ComponentFixture<NewCategoryModalComponent>;
  let createService: jasmine.SpyObj<CreateService>;
  let getService: jasmine.SpyObj<GetService>;
  let updateService: jasmine.SpyObj<UpdateService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const createServiceSpy = jasmine.createSpyObj('CreateService', ['create']);
    const getServiceSpy = jasmine.createSpyObj('GetService', ['get']);
    const updateServiceSpy = jasmine.createSpyObj('UpdateService', ['update']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } } });

    await TestBed.configureTestingModule({
      declarations: [ NewCategoryModalComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: CreateService, useValue: createServiceSpy },
        { provide: GetService, useValue: getServiceSpy },
        { provide: UpdateService, useValue: updateServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCategoryModalComponent);
    component = fixture.componentInstance;
    createService = TestBed.inject(CreateService) as jasmine.SpyObj<CreateService>;
    getService = TestBed.inject(GetService) as jasmine.SpyObj<GetService>;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.categoryForm).toBeDefined();
    expect(component.categoryForm.controls['name']).toBeDefined();
    expect(component.categoryForm.controls['description']).toBeDefined();
  });

  it('should set errorMessage if form is invalid on create', () => {
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['description'].setValue('');
    component.createCategory();
    expect(component.errorMessage).toBe('Form invalid');
  });

  it('should set errorMessage if form is invalid on update', () => {
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['description'].setValue('');
    component.updateCategory();
    expect(component.errorMessage).toBe('Form invalid');
  });

  it('should call createCategoryService.create if form is valid on create', () => {
    const category = { name: 'Category 1', description: 'Description 1' };
    createService.create.and.returnValue(of(void 1));
    component.categoryForm.controls['name'].setValue('Category 1');
    component.categoryForm.controls['description'].setValue('Description 1');
    component.createCategory();
    expect(createService.create).toHaveBeenCalledWith(category);
  });

  it('should call updateCategoryService.update if form is valid on update', () => {
    const category = { name: 'Category 1', description: 'Description 1' };
    updateService.update.and.returnValue(of(void 1));
    component.categoryId = 1;
    component.categoryForm.controls['name'].setValue('Category 1');
    component.categoryForm.controls['description'].setValue('Description 1');
    component.updateCategory();
    expect(updateService.update).toHaveBeenCalledWith(1, category);
  });

  it('should load category data when loadModal is called', () => {
    const category = { id: 1, name: 'Category 1', description: 'Description 1' };
    getService.get.and.returnValue(of(category));
    component.categoryId = 1;
    component.loadModal();
    expect(getService.get).toHaveBeenCalledWith(1);
    expect(component.categoryForm.controls['name'].value).toBe('Category 1');
    expect(component.categoryForm.controls['description'].value).toBe('Description 1');
  });

  it('should reset form and open modal when openModal is called', () => {
    component.openModal();
    expect(component.categoryForm.controls['name'].value).toBe('');
    expect(component.categoryForm.controls['description'].value).toBe('');
    expect(component.opened).toBeTrue();
  });

  it('should close modal when closeModal is called', () => {
    component.closeModal();
    expect(component.opened).toBeFalse();
  });
});
