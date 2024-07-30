import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTagModalComponent } from './new-tag-modal.component';
import { CreateService } from '../../services/tag/create/create.service';
import { UpdateService } from '../../services/tag/update/update.service';

describe('NewTagModalComponent', () => {
  let component: NewTagModalComponent;
  let fixture: ComponentFixture<NewTagModalComponent>;
  let createService: jasmine.SpyObj<CreateService>;
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
      declarations: [ NewTagModalComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: CreateService, useValue: createServiceSpy },
        { provide: UpdateService, useValue: updateServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTagModalComponent);
    component = fixture.componentInstance;
    createService = TestBed.inject(CreateService) as jasmine.SpyObj<CreateService>;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.tagForm).toBeDefined();
    expect(component.tagForm.controls['name']).toBeDefined();
    expect(component.tagForm.controls['description']).toBeDefined();
  });

  it('should set errorMessage if form is invalid on create', () => {
    component.tagForm.controls['name'].setValue('');
    component.tagForm.controls['description'].setValue('');
    component.createTag();
    expect(component.errorMessage).toBe('Form invalid');
  });

  it('should set errorMessage if form is invalid on update', () => {
    component.tagForm.controls['name'].setValue('');
    component.tagForm.controls['description'].setValue('');
    component.updateTag();
    expect(component.errorMessage).toBe('Form invalid');
  });

  it('should call createTagService.create if form is valid on create', () => {
    const tag = { name: 'Tag 1', description: 'Description 1' };
    createService.create.and.returnValue(of(void 1));
    component.tagForm.controls['name'].setValue('Tag 1');
    component.tagForm.controls['description'].setValue('Description 1');
    component.createTag();
    expect(createService.create).toHaveBeenCalledWith(tag);
  });

  it('should call updateTagService.update if form is valid on update', () => {
    const tag = { name: 'Tag 1', description: 'Description 1' };
    updateService.update.and.returnValue(of(void 1));
    component.tagForm.patchValue({tagSelected: 1});
    component.tagForm.controls['name'].setValue('Tag 1');
    component.tagForm.controls['description'].setValue('Description 1');
    component.updateTag();
    expect(updateService.update).toHaveBeenCalledWith(1, tag);
  });

  it('should load tag data when select updates its value', () => {
    const tag = { id: 1, name: 'Tag 1', description: 'Description 1' };
    component.tags = [tag];
    component.loadModal();
    component.tagForm.patchValue({tagSelected: 'null'});
    component.insertTagData();
    component.tagForm.patchValue({tagSelected: 1});
    component.insertTagData();
    expect(component.tagForm.controls['name'].value).toBe('Tag 1');
    expect(component.tagForm.controls['description'].value).toBe('Description 1');
  });

  it('should reset form and open modal when openModal is called', () => {
    component.openModal();
    expect(component.tagForm.controls['name'].value).toBe('');
    expect(component.tagForm.controls['description'].value).toBe('');
    expect(component.opened).toBeTrue();
  });

  it('should close modal when closeModal is called', () => {
    component.closeModal();
    expect(component.opened).toBeFalse();
  });
});
