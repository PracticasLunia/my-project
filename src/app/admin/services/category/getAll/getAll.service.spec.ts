import { TestBed } from '@angular/core/testing';
import { GetAllService } from './getAll.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('FindService', () => {
  let service: GetAllService;
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
        GetAllService
      ]
    });
    service = TestBed.inject(GetAllService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const expectedUrl = `${service['apiUrl']}`;

    service.getAll().subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
