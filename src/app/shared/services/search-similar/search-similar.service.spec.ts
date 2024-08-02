import { TestBed } from '@angular/core/testing';
import { SearchSimilarService } from './search-similar.service';
import { CookieService } from 'ngx-cookie-service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports

describe('VerifiedService', () => {
  let service: SearchSimilarService;
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
        SearchSimilarService
      ]
    });
    service = TestBed.inject(SearchSimilarService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verified with the correct URL and headers', () => {
    const expectedUrl = `${service['apiUrl']}`;

    service.searchSimilar('test').subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
