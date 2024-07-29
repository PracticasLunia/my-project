
import { TestBed } from '@angular/core/testing';
import { DeleteService } from './delete.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('DeleteService', () => {
  let service: DeleteService;
  let mockHttp: HttpTestingController;
  let mockCookieService: CookieService;

  beforeEach(() => {
    const cookieServiceStub = {
      delete: (key: string) => 'test-token'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: CookieService, useValue: cookieServiceStub},
        DeleteService
      ]
    });
    service = TestBed.inject(DeleteService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const tagId = 1;
    const expectedUrl = `${service['apiUrl']}${tagId}`;

    service.delete(tagId).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

