import { TestBed } from '@angular/core/testing';
import { VerifyService } from './verify.service';
import { CookieService } from 'ngx-cookie-service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports

describe('VerifyService', () => {
  let service: VerifyService;
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
        VerifyService
      ]
    });
    service = TestBed.inject(VerifyService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const userId = 123;
    const expectedUrl = `${service['apiUrl']}${userId}`;

    service.verify(userId).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });
});
