
import { TestBed } from '@angular/core/testing';
import { GetService } from './get.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('GetService', () => {
  let service: GetService;
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
        GetService
      ]
    });
    service = TestBed.inject(GetService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const categoryIsbn = '123';
    const expectedUrl = `${service['apiUrl']}${categoryIsbn}`;

    service.get(categoryIsbn).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});

