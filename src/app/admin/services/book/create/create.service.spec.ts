
import { TestBed } from '@angular/core/testing';
import { CreateService } from './create.service';
import { environment } from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../../shared/models/book';

describe('CreateService', () => {
  let service: CreateService;
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
        CreateService
      ]
    });
    service = TestBed.inject(CreateService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const bookIsbn = '123';
    const book: Book | any = {
      title: 'test',
      isbm: 'asd'
    }
    const expectedUrl = `${service['apiUrl']}${bookIsbn}`;

    service.create(book).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

