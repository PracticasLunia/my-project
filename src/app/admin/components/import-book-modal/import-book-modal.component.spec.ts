import { ImportService } from './../../services/book/import/import.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ImportBookModalComponent } from './import-book-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ImportBookModalComponent', () => {
  let component: ImportBookModalComponent;
  let fixture: ComponentFixture<ImportBookModalComponent>;
  let service: ImportService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportBookModalComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ImportService,
          useValue: {
            import: jasmine.createSpy('import').and.returnValue(of({data: ''}))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportBookModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ImportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the modal', () => {
    component.openModal();
    fixture.detectChanges();
    let modal: DebugElement = fixture.debugElement.query(By.css('div[role="dialog"]'));
    expect(modal).toBeTruthy();

    component.closeModal();
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('div[role="dialog"]'));
    expect(modal).toBeFalsy();
  });


  it('should call openModal and set opened to true', () => {
    component.openModal();
    expect(component.opened).toBeTrue();
  });

  it('should call closeModal and set opened to false', () => {
    component.opened = true;
    component.closeModal();
    expect(component.opened).toBeFalse();
  });

  it('should disable import button when importing', () => {
    component.openModal();
    fixture.detectChanges();
    component.importing = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.children[1].query((By.css('button'))).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should import the book and call the service', () => {
    component.enableImport(new SubmitEvent("test"));
    component.file = new File(['asd'], 'test', {});
    fixture.detectChanges();
    component.importBook();
    expect(service.import).toHaveBeenCalled();
  })

  it('should import the book and fail the service', () => {
    const errorResponse = { error: { error: 'Import failed' } };
    (service.import as jasmine.Spy).and.returnValue(throwError(() => errorResponse));

    component.enableImport(new SubmitEvent("test"));
    component.file = new File(['asd'], 'test', {});
    fixture.detectChanges();
    component.importBook();
    expect(service.import).toHaveBeenCalled();
  })
});
