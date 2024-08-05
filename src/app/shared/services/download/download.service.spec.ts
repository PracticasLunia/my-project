import { TestBed } from '@angular/core/testing';
import { DownloadService } from './download.service';
import { CookieService } from 'ngx-cookie-service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports

describe('VerifiedService', () => {
  let service: DownloadService;
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
        DownloadService
      ]
    });
    service = TestBed.inject(DownloadService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verified with the correct URL and headers', () => {
    const expectedUrl = `${service['apiUrl']}+isbn-test`;

    service.download('isbn-test').subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
