
import { TestBed } from '@angular/core/testing';
import { CoverService } from './cover.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('CoverService', () => {
  let service: CoverService;
  let mockHttp: HttpTestingController;
  let mockCookieService: CookieService;

  beforeEach(() => {
    const cookieServiceStub = {
      cover: (key: string) => 'test-token'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: CookieService, useValue: cookieServiceStub},
        CoverService
      ]
    });
    service = TestBed.inject(CoverService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const bookIsbn = '123';
    const expectedUrl = `${service['apiUrl']}${bookIsbn}`;

    service.cover(bookIsbn).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});

