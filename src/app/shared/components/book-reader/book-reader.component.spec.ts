import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookReaderComponent } from './book-reader.component';
import { DownloadService } from '../../services/download/download.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1234567890')
    }
  };
}

describe('BookReaderComponent', () => {
  let component: BookReaderComponent;
  let fixture: ComponentFixture<BookReaderComponent>;
  let downloadServiceStub: Partial<DownloadService>;
  let activatedRoute: ActivatedRoute

  beforeEach(async () => {
    downloadServiceStub = {
      download: jasmine.createSpy('download').and.returnValue(of({ body: new Blob(['test content'], { type: 'application/pdf' }) }))
    };

    await TestBed.configureTestingModule({
      declarations: [BookReaderComponent],
      providers: [
        { provide: DownloadService, useValue: downloadServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      imports: [
        PdfViewerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookReaderComponent);
    activatedRoute = TestBed.inject(ActivatedRoute)
    component = fixture.componentInstance;
  });

  it('should create', () => {
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);
    component.readOnline();
    expect(component).toBeTruthy();
  });

  it('should open modal with file URL when readOnline is called and fileUrl is provided', () => {
    component.fileUrl = 'http://example.com/test.pdf';
    component.readOnline();
    expect(component.open).toBe(true);
  });

  it('should download file and open modal when readOnline is called and fileUrl is not provided', async () => {
    component.fileUrl = '';
    component.readOnline();
    expect(downloadServiceStub.download).toHaveBeenCalledWith('1234567890');

    // Wait for the download to complete
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.fileUrl).toContain('blob:');
      expect(component.open).toBe(true);
    });
  });

  it('should try download file and open modal when readOnline is called error thrown', async () => {
    (downloadServiceStub.download as jasmine.Spy).and.returnValue(throwError('error'));
    component.fileUrl = '';
    component.readOnline();
    expect(downloadServiceStub.download).toHaveBeenCalled();
  });

  it('should close the modal when closeModal is called', () => {
    component.open = true;
    component.closeModal();
    expect(component.open).toBe(false);
  });
});
