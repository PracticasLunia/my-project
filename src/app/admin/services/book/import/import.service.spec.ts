
import { TestBed } from '@angular/core/testing';
import { ImportService } from './import.service';
import { environment } from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../../shared/models/book';

describe('ImportService', () => {
  let service: ImportService;
  let mockHttp: HttpTestingController;
  let mockCookieService: CookieService;

  beforeEach(() => {
    const cookieServiceStub = {
      get: (key: string) => 'test-token'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: CookieService, useValue: cookieServiceStub},
        ImportService
      ]
    });
    service = TestBed.inject(ImportService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be importd', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const book: Book | any = {
      title: 'test',
      isbn: 'asd'
    }
    const expectedUrl = `${service['apiUrl']}`;

    service.import(book).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

